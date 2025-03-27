import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { PUNCH_IN, PUNCH_OUT } from 'store/actions';

const initialState = {
    punchActionToPerform: null,
    autoPunchOutAt: null,
    error: null
};

const slice = createSlice({
    name: 'punchInOut',
    initialState,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        punchIn(state, action) {
            state.punchActionToPerform = PUNCH_OUT;
        },
        // eslint-disable-next-line no-unused-vars
        punchOut(state, action) {
            state.punchActionToPerform = PUNCH_IN;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { punchIn, punchOut, setError } = slice.actions;

export const performPunchIn = () => async (dispatch, getState) => {
    try {
        const state = getState();
        if (state.punchInOut.error !== null) {
            console.log('Error:', state.punchInOut.error);
            return;
        }
        //eslint-disable-next-line
        const user_id = state.user.user_id;
        const currentDateTime = new Date().toISOString();
        const response = await axios.post(`/brain/users/${user_id}/login`, { timestamp: currentDateTime.toString() });
        if (response.status === 200) {
            dispatch(slice.actions.punchIn());
        } else {
            throw new Error('Failed to punch in');
        }
    } catch (error) {
        dispatch(slice.actions.setError({ message: error.message }));
    }
};

export const performPunchOut = () => async (dispatch, getState) => {
    try {
        const state = getState();
        //eslint-disable-next-line
        const user_id = state.user.user_id;
        const currentDateTime = new Date().toISOString();
        const response = await axios.post(`/brain/users/${user_id}/logout`, { timestamp: currentDateTime.toString() });
        if (response.status === 200) {
            dispatch(slice.actions.punchOut());
        } else {
            throw new Error('Failed to punch out');
        }
    } catch (error) {
        dispatch(slice.actions.setError({ message: error.message }));
    }
};

//eslint-disable-next-line
export const setInitialAction = () => async (dispatch, getState) => {
    const state = getState();
    if (state.punchInOut.punchActionToPerform !== null) {
        return;
    }
    //eslint-disable-next-line
    try {
        const user_id = state.user.user_id;
        const response = await axios.get(`/brain/users/${user_id}/punch-status`);
        if (response.status === 200 && response.data.lastAction) {
            if (response.data.lastAction === PUNCH_IN) {
                // last action made by user was punch in
                dispatch(slice.actions.punchIn());
            } else {
                // last action made by user was punch out, so set the action to punch in
                dispatch(slice.actions.punchOut());
            }
        } else {
            // user has not made any action yet, so set the action to punch in
            throw new Error('No punch status found');
        }
    } catch (error) {
        dispatch(slice.actions.setError({ message: 'Failed to fetch punch status' }));
    }
};

export default slice.reducer;
