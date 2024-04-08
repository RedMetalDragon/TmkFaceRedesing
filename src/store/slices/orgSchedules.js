import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';

const initialState = {
    loading: true,
    error: null,
    events: [],
    data: []
};

const slice = createSlice({
    name: 'orgSchedules',
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
        },
        // Post data
        postData(state, action) {
            state.data.push(action.payload);
        },
        // Remove event
        removeData(state, action) {
            state.data = state.data.filter((item) => item.id !== action.payload);
        }
        // Update event
    }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailed } = slice.actions;

export function fetchOrgSchedules() {
    return async (dispatch) => {
        dispatch(fetchDataStart());
        try {
            const response = await axios.get('/schedule');
            dispatch(fetchDataSuccess(response.data));
        } catch (error) {
            dispatch(fetchDataFailed(error));
        }
    };
}

export function postOrgSchedule(data) {
    return async (dispatch) => {
        try {
            await axios.post('/schedule', data);
            dispatch(postData(data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

export default slice.reducer;
