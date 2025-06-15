import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RegisterForm from '../RegisterForm';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme

// Mock dependencies
jest.mock('hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    register: jest.fn()
  })
}));

jest.mock('store/slices/createAccount', () => ({
  ...jest.requireActual('store/slices/createAccount'),
  requestEmailVerificationCode: jest.fn(() => ({ type: 'mock/requestEmailVerificationCode' })),
  setUserDetails: jest.fn((values) => ({ type: 'mock/setUserDetails', payload: values })),
  resetForm: jest.fn(() => ({ type: 'mock/resetForm' })),
}));

const mockStore = configureStore([]);
const theme = createTheme(); // Create a basic theme

const renderComponent = (store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}> {/* Add ThemeProvider */}
          <RegisterForm handleNext={jest.fn()} setErrorIndex={jest.fn()} />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('RegisterForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      createAccount: {
        userDetails: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          agreeOnTerms: true,
          dateOfBirth: ''
        },
        isSubmitting: false,
        error: null
      }
    });
  });

  test('renders Date of Birth field', () => {
    renderComponent(store);
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toHaveAttribute('type', 'date');
  });

  test('shows required error for Date of Birth if submitted empty', async () => {
    renderComponent(store);
    fireEvent.submit(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
    });
  });

  test('shows age error if Date of Birth is less than 18 years ago', async () => {
    renderComponent(store);
    const dateOfBirthInput = screen.getByLabelText(/Date of Birth/i);

    // Calculate a date that is less than 18 years ago
    const today = new Date();
    const lessThan18YearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
    const formattedDate = lessThan18YearsAgo.toISOString().split('T')[0];

    fireEvent.change(dateOfBirthInput, { target: { value: formattedDate } });
    fireEvent.submit(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText('You must be at least 18 years old')).toBeInTheDocument();
    });
  });

  test('does not show age error if Date of Birth is 18 years ago or more', async () => {
    renderComponent(store);
    const dateOfBirthInput = screen.getByLabelText(/Date of Birth/i);
    const emailInput = screen.getByLabelText(/Email Address/i); // Fill other required fields
    const passwordInput = screen.getByLabelText(/Password/i);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);


    // Calculate a date that is exactly 18 years ago
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const formattedDate = eighteenYearsAgo.toISOString().split('T')[0];

    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(dateOfBirthInput, { target: { value: formattedDate } });

    // Check the "Agree with Terms & Condition" checkbox
    const agreeCheckbox = screen.getByRole('checkbox', { name: /Agree with/i });
    fireEvent.click(agreeCheckbox);

    fireEvent.submit(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.queryByText('You must be at least 18 years old')).not.toBeInTheDocument();
      // It should proceed to call setUserDetails if all fields are valid
      // expect(store.getActions()).toContainEqual(expect.objectContaining({ type: 'mock/setUserDetails' }));
    });
  });
});
