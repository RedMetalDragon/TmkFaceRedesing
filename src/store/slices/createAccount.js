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

const urlPrefix = 'http://localhost:5192/api/users/register-new-user/step-one';

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
        setSubscriptionPlan(state, action) {
            state.userDetails.subscriptionPlan = action.payload;
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
                agreeOnTermsAndConditions: true
            };
            state.subscriptionPlan = '';
            state.paymentMethodId = '';
            state.isSubmitting = false;
        }
    }
});

// Reducer
export default slice.reducer;

export function saveUserDetails(userDetails) {
    return async () => {
        try {
            dispatch(slice.actions.startSubmitting());
            dispatch(slice.actions.setUserDetails(userDetails));
            // Replace with your backend API endpoint
            await axios.post('/stripe/api/users/register-new-user/step-one', userDetails);
            //await axios.post(`${urlPrefix}`, userDetails);
            dispatch(slice.actions.stopSubmitting());
        } catch (error) {
            dispatch(slice.actions.stopSubmitting());
            throw error;
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
            const response = await axios.post(`/stripe/api/users/register-new-user/step-two`, userDetails);
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

export function setUserDetails(details) {
    return () => {
        dispatch(slice.actions.setUserDetails(details));
    };
}
