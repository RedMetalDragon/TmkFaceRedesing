import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useSelector as actualUseSelector, useDispatch as actualUseDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegisterForm from './RegisterForm';
import * as createAccountSliceActions from 'store/slices/createAccount';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ children, to }) => <a href={to}>{children}</a>, // Simple mock for Link
    useNavigate: () => jest.fn(),
}));

// Mock useAuth hook
jest.mock('hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    register: jest.fn().mockResolvedValue({}),
  }),
}));

// Mock react-redux's useSelector and useDispatch
// This allows us to control what the component receives from the store
// and to spy on dispatches if needed, though mockStore.dispatch is usually sufficient.
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

// Mock the specific thunk and actions from the createAccount slice
// We want to control the behavior of requestEmailVerificationCode
// and ensure other actions like setUserDetails are also mocked if they are called.
jest.mock('store/slices/createAccount', () => {
    const originalModule = jest.requireActual('store/slices/createAccount');
    return {
        ...originalModule,
        requestEmailVerificationCode: jest.fn(),
        setUserDetails: jest.fn((details) => ({ type: 'createAccount/setUserDetails', payload: details })),
        resetForm: jest.fn(() => ({ type: 'createAccount/resetForm' })),
        // Keep the actual reducer if needed for other tests, or mock it if it interferes
        default: originalModule.default,
    };
});

const mockStore = configureStore([]); // No middleware needed for this kind of mock

describe('RegisterForm', () => {
    let store;
    let mockDispatch;

    // Helper to set up useSelector mock for different states
    const mockSelector = (isSubmitting, error, userDetails = null) => {
        actualUseSelector.mockImplementation((callback) => {
            return callback({
                createAccount: {
                    isSubmitting,
                    error,
                    userDetails: userDetails || { firstName: '', lastName: '', email: '', password: '', agreeOnTerms: true },
                },
            });
        });
    };

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();

        // Setup mock dispatch
        mockDispatch = jest.fn((actionOrThunk) => {
            if (typeof actionOrThunk === 'function') { // It's a thunk
                return actionOrThunk(mockDispatch, () => store.getState()); // Call thunk with dispatch and getState
            }
            // For plain actions, just return the action (or what your middleware would do)
            return actionOrThunk;
        });
        actualUseDispatch.mockReturnValue(mockDispatch);


        // Configure the mock for requestEmailVerificationCode
        createAccountSliceActions.requestEmailVerificationCode.mockImplementation(() => async (dispatch) => {
            // Simulate the sequence: start submitting -> API error -> stop submitting
            // These dispatches would normally update the Redux state via reducers.
            // Here, they help us track action calls and simulate state changes via mockSelector.
            dispatch({ type: 'createAccount/startSubmitting' }); // For tracking if needed
            mockSelector(true, null); // Simulate state change: submitting = true

            await new Promise(resolve => setTimeout(resolve, 50)); // Simulate API call delay

            const apiError = "API Error from Mock";
            dispatch({ type: 'createAccount/hasError', payload: apiError }); // For tracking
            mockSelector(false, apiError); // Simulate state change: submitting = false, error = API Error
            dispatch({ type: 'createAccount/stopSubmitting' }); // For tracking

            return Promise.reject({ message: apiError }); // Thunk rejects
        });
    });

    it('should not open OTP modal and display error message on email verification failure', async () => {
        // Initial store state for useSelector
        mockSelector(false, null);

        // The store itself is mainly for the Provider, dispatch spy can be on actualUseDispatch's mock
        store = mockStore({
            createAccount: { // This initial state is less critical if useSelector is fully mocked
                userDetails: { firstName: '', lastName: '', email: '', password: '', agreeOnTerms: true },
                isSubmitting: false,
                error: null,
            }
        });

        render(
            <Provider store={store}>
                <RegisterForm handleNext={jest.fn()} setErrorIndex={jest.fn()} />
            </Provider>
        );

        // Wait for the initial 3-second component internal loader to disappear
        // by waiting for a form element to be present.
        await waitFor(() => {
            expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        }, { timeout: 3500 });

        // Fill the form
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/email address \/ username/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /next/i }));

        // Assertions
        await waitFor(() => {
            // 1. OTP Modal is not open
            expect(screen.queryByText(/verify your email/i)).not.toBeInTheDocument();
            // Check for a more specific element if "Verify Your Email" is too generic
            // e.g., expect(screen.queryByTestId('otp-verification-modal')).not.toBeVisible();

            // 2. Error message is displayed
            expect(screen.getByText("Upps that was embarrassing, please try again later")).toBeInTheDocument();

            // 3. Submit button is enabled and no spinner
            const submitButton = screen.getByRole('button', { name: /next/i });
            expect(submitButton).not.toBeDisabled();
            expect(submitButton.querySelector('.MuiCircularProgress-root')).not.toBeInTheDocument();
        });

        // 4. Verify the thunk was called
        expect(createAccountSliceActions.requestEmailVerificationCode).toHaveBeenCalledTimes(1);

        // Verify setUserDetails was dispatched
        // Check mockDispatch.mock.calls for the action
        expect(mockDispatch).toHaveBeenCalledWith(createAccountSliceActions.setUserDetails(
            expect.objectContaining({
                email: 'john.doe@example.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'Password123!',
            })
        ));
    });
});
