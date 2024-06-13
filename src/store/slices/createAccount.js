import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';

const initialState = {
    error: null,
    currentStep: 0,
    userDetails: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreeOnTerms: true,
        subscriptionPlan: '',
        typeofPlan: 'monthly'
    },
    paymentMethodId: '',
    customerId: '',
    intentClientSecret: '',
    isSubmitting: false
};

const urlPrefix = 'http://localhost:5192/api/users/register-new-user/user-details';

const slice = createSlice({
    name: 'createAccount',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        setUserDetails(state, action) {
            state.userDetails = { ...state.userDetails, ...action.payload };
        },
        setPaymentMethodId(state, action) {
            state.paymentMethodId = action.payload;
        },
        setCustomerId(state, action) {
            state.customerId = action.payload;
        },
        setSetupIntentClientSecret(state, action) {
            state.intentClientSecret = action.payload;
        },
        setSubscriptionPlan(state, action) {
            state.userDetails.subscriptionPlan = action.payload;
        },
        setCurrentStep(state, action) {
            state.currentStep = action.payload;
        },
        startSubmitting(state) {
            state.isSubmitting = true;
        },
        stopSubmitting(state) {
            state.isSubmitting = false;
        },
        resetForm(state) {
            state.error = null;
            state.currentStep = 0;
            state.userDetails = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                agreeOnTermsAndConditions: true,
                subscriptionPlan: '',
                typeofPlan: 'monthly'
            };
            state.subscriptionPlan = '';
            state.paymentMethodId = '';
            state.isSubmitting = false;
        }
    }
});

// Reducer
export default slice.reducer;

// user Enter email, name password etd
export function setUserDetails(userDetails) {
    return async () => {
        try {
            dispatch(slice.actions.setUserDetails(userDetails));
        } catch (error) {
            dispatch(slice.actions.stopSubmitting());
            dispatch(slice.actions.setCurrentStep(0));
            throw error;
        }
    };
}

// user select plan
export function setUserSubscriptionPlan(plan) {
    return async () => {
        try {
            dispatch(slice.actions.setSubscriptionPlan(plan));
        } catch (error) {
            dispatch(slice.actions.stopSubmitting());
            dispatch(slice.actions.setCurrentStep(1));
            throw error;
        }
    };
}

export function saveUserDetailsInSessionBackend(userDetails) {
    return async () => {
        try {
            dispatch(slice.actions.startSubmitting());
            await axios.post(`/gondor/users/register-new-user/user-details`, userDetails).then((response) => {
                if (response.status === 200 && response.data.subscriptionId && response.data.clientSecret) {
                    console.log('Payment service response status: ', response.status); //TODO Remove this line after testing
                    dispatch(slice.actions.setSetupIntentClientSecret(response.data.clientSecret));
                    dispatch(slice.actions.setCustomerId(response.data.customerId));
                } else {
                    //TODO handle error properly showing an error dialog or something
                }
            });
            dispatch(slice.actions.stopSubmitting());
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            dispatch(slice.actions.stopSubmitting());
            dispatch(slice.actions.setCurrentStep(1));
        }
    };
}

export function handleErrors(error) {
    return async () => {
        dispatch(slice.actions.hasError(error));
        dispatch(slice.actions.stopSubmitting());
    };
}

export function saveSubscriptionPlan(userDetails) {
    return async () => {
        try {
            dispatch(slice.actions.startSubmitting());
            // Replace with your backend API endpoint
            const response = await axios.post(`/gondor/api/users/register-new-user/step-two`, userDetails);
            if (response.data.customerId && response.data.intentClientSecret) {
                dispatch(slice.actions.setCustomerId(response.data.customerId));
                dispatch(slice.actions.setSetupIntentClientSecret(response.data.intentClientSecret));
            }
            dispatch(slice.actions.stopSubmitting());
            dispatch(slice.actions.setCurrentStep(2));
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            dispatch(slice.actions.stopSubmitting());
        }
    };
}

export function savePaymentMethod(paymentMethodId, userDetails, subscriptionPlan) {
    return async () => {
        try {
            dispatch(slice.actions.startSubmitting());
            // Replace with your backend API endpoint
            await axios.post(`${urlPrefix}`, { paymentMethodId, userDetails, subscriptionPlan });
            dispatch(slice.actions.setPaymentMethodId(paymentMethodId));
            dispatch(slice.actions.setCurrentStep(3));
            dispatch(slice.actions.stopSubmitting());
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            dispatch(slice.actions.stopSubmitting());
        }
    };
}

export function setSubscriptionPlan(plan) {
    return () => {
        dispatch(slice.actions.setSubscriptionPlan(plan));
    };
}

export function setCurrentStep(step) {
    return () => {
        dispatch(slice.actions.setCurrentStep(step));
    };
}
