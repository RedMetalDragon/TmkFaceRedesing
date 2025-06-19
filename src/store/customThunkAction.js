import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserDetails } from 'store/slices/createAccount';

export const setPlanAndSaveUserDetails = createAsyncThunk(
    'createAccount/setPlanAndSaveUserDetails',
    async ({ planId, userDetails }, { dispatch, getState }) => {
        // Dispatch the action to set the subscription plan
        const updatedUserDetails = { ...userDetails, subscriptionPlan: planId };
        dispatch(setUserDetails(updatedUserDetails));

        // Wait for the state to be updated
        const state = getState();
        //console.log('planId', planId);
        console.log('state', state);

        // Dispatch the action to save user details in the backend
        //await dispatch(saveUserDetailsInSessionBackend(updatedUserDetails));
    }
);
