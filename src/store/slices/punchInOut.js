import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    punchIn: null,
    punchOut: null,
    autoPunchOutAt: null,
    error: null
};

const punchInOutSlice = createSlice({
    name: 'punchInOut',
    initialState,
    reducers: {
        punchIn(state, action) {
            state.punchIn = action.payload.punchIn;
            state.autoPunchOutAt = action.payload.autoPunchOutAt;
        },
        punchOut(state, action) {
            state.punchOut = action.payload.punchOut;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { punchIn, punchOut, setError } = punchInOutSlice.actions;

export default punchInOutSlice.reducer;
