import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';

const initialState = {
    loading: true,
    error: null,
    events: [],
    data: []
};
const slice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        // Fetch data start
        fetchDataStart(state) {
            state.loading = true;
        },
        // Fetch data success
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailed } = slice.actions;

export function fetchUserScheduleTable() {
    return async (dispatch) => {
        dispatch(fetchDataStart());
        try {
            const response = await axios.get('/users/schedule');
            dispatch(fetchDataSuccess(response.data));
        } catch (error) {
            dispatch(fetchDataFailed(error));
        }
    };
}

export default slice.reducer;
