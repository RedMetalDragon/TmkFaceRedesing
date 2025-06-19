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
        dateOfBirth: ''
    },
    selectedPlan: null,
    availablePlans: null,
    billingCycle: 'Monthly',
    paymentMethodId: '',
    customerId: '',
    intentClientSecret: '',
    isSubmitting: false,
    loadingPlans: false
};

const urlPrefix = 'http://localhost:5192/api/users/register-new-user/user-details';

const slice = createSlice({
    name: 'createAccount',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        setSelectedPlan(state, action) {
            state.selectedPlan = action.payload;
        },
        setAvaliablesPlans(state, action) {
            state.availablePlans = action.payload;
        },
        setBillingCycle(state, action) {
            state.billingCycle = action.payload;
            // If there's a selected plan, find its equivalent in the new billing cycle
            if (state.selectedPlan && state.availablePlans) {
                const newPlans = action.payload === 'Monthly' ? state.availablePlans.monthlyPlans : state.availablePlans.yearlyPlans;
                const equivalentPlan = newPlans?.find((plan) => plan.subscriptionName === state.selectedPlan.subscriptionName);
                if (equivalentPlan) {
                    state.selectedPlan = equivalentPlan;
                }
            }
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
                typeofPlan: 'monthly',
                dateOfBirth: ''
            };
            state.subscriptionPlan = '';
            state.paymentMethodId = '';
            state.isSubmitting = false;
        },
        startLoadingPlans(state) {
            state.loadingPlans = true;
            state.error = null;
        },
        setAvailablePlans(state, action) {
            state.availablePlans = action.payload;
            state.loadingPlans = false;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loadingPlans = false;
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

export function getPlansAvailables() {
    return async (dispatch) => {
        try {
            dispatch(slice.actions.startLoadingPlans());
            const response = await axios.get('/gondor/plans');
            dispatch(slice.actions.setAvailablePlans(response.data));
            return response.data;
        } catch (error) {
            console.error('Error fetching plans:', error);
            dispatch(slice.actions.setError(error.response?.data?.message || error.message));
            throw error;
        }
    };
}

export function switchBillingCycle() {
    return (dispatch, getState) => {
        try {
            const state = getState();
            const { billingCycle, availablePlans, selectedPlan } = state.createAccount;

            // Toggle billing cycle
            const newBillingCycle = billingCycle === 'Monthly' ? 'Yearly' : 'Monthly';
            dispatch(slice.actions.setBillingCycle(newBillingCycle));

            // If there's a selected plan, find its equivalent in the new billing cycle
            if (selectedPlan && availablePlans) {
                const newPlans = newBillingCycle === 'Monthly' ? availablePlans.monthlyPlans : availablePlans.yearlyPlans;
                const equivalentPlan = newPlans?.find((plan) => plan.subscriptionName === selectedPlan.subscriptionName);
                if (equivalentPlan) {
                    dispatch(slice.actions.setSelectedPlan(equivalentPlan));
                }
            }
        } catch (error) {
            console.error('Error switching billing cycle:', error);
            dispatch(slice.actions.setError(error.message));
            throw error;
        }
    };
}

// Action creator for updating selected plan
export function updateSelectedPlan(plan) {
    return (dispatch) => {
        try {
            dispatch(slice.actions.setSelectedPlan(plan));
        } catch (error) {
            console.error('Error updating selected plan:', error);
            dispatch(slice.actions.setError(error.message));
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
    //TODO remove this function (is legacy code)
    return async () => {
        try {
            console.log('SHOULD BE REMOVED ====> saveUserDetailsInSessionBackend');
            dispatch(slice.actions.startSubmitting());
            await axios.post(`/gondor/users/register-new-user/user-details`, userDetails).then((response) => {
                if (response.status === 200 && response.data.subscriptionId && response.data.clientSecret) {
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
            console.log('SHOULD BE REMOVED ====> saveSubscriptionPlan');
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

export function resetForm() {
    return () => {
        dispatch(slice.actions.resetForm());
    };
}

export function setCurrentStep(step) {
    return () => {
        dispatch(slice.actions.setCurrentStep(step));
    };
}

export function getCheckoutSession() {
    return async (dispatch, getState) => {
        try {
            dispatch(slice.actions.startSubmitting());
            const state = getState();
            const { selectedPlan, userDetails } = state.createAccount;
            const response = await axios.post('/gondor/checkout/create-checkout-session-for-subscription', {
                PriceId: selectedPlan?.priceId,
                Email: userDetails.email,
                FirstName: userDetails.firstName,
                LastName: userDetails.lastName
            });
            if (response.status === 200) {
                dispatch(slice.actions.setSetupIntentClientSecret(response.data.intentClientSecret));
            }
            dispatch(slice.actions.stopSubmitting());
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            dispatch(slice.actions.stopSubmitting());
        }
    };
}

export function requestEmailVerificationCode() {
    return async (dispatch, getState) => {
        try {
            dispatch(slice.actions.startSubmitting());
            const state = getState();
            const { userDetails } = state.createAccount;
            const response = await axios.post('core/account-verification', {
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName
            });
            if (response.status === 200) {
                // Handle success response if needed
                dispatch(slice.actions.stopSubmitting());
                return response; // Return success response
            }
            dispatch(slice.actions.stopSubmitting());
            return response;
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data?.message || error.message));
            dispatch(slice.actions.stopSubmitting());
            throw error; // Re-throw the error so the component can catch it
        }
    };
}
