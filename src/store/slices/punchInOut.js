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
        //eslint-disable-next-line
        const employeeId = state.user.employeeId;
        const response = await axios.post(`/brain/users/${employeeId}/login`);
        if (response.status === 200) {
            dispatch(slice.actions.punchIn());
        } else {
            throw new Error('Failed to punch in');
        }
    } catch (error) {
        dispatch(slice.actions.setError(error));
    }
};

export const performPunchOut = () => async (dispatch, getState) => {
    try {
        const state = getState();
        //eslint-disable-next-line
        const employeeId = state.user.employeeId;
        const response = await axios.post(`/brain/users/${employeeId}/logout`);
        if (response.status === 200) {
            dispatch(slice.actions.punchOut());
        } else {
            throw new Error('Failed to punch out');
        }
        dispatch(slice.actions.punchOut());
    } catch (error) {
        dispatch(slice.actions.setError(error));
    }
};

//eslint-disable-next-line
export const setInitialAction = () => async (dispatch, getState) => {
    // read the user current state
    //const state = getState();
    // if the user is already punched in, set the action to punch out

    // TODO: remove line below to the proper implementation
    dispatch(slice.actions.punchOut());
};

export default slice.reducer;
