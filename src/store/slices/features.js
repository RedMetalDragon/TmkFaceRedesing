import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';

const initialState = {
    error: null,
    featuresEnabled: [
        {
            name: 'dashboard',
            route: '/dashboard',
            icon: '../../assets/images/bart-chart-outline.svg'
        }
    ]
};

const slice = createSlice({
    name: 'features',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        // ADD FEATURE
        addFeatureSuccess(state, action) {
            //check if feature already exists
            const exists = state.featuresEnabled.find((feature) => feature.name === action.payload.name);
            if (!exists) {
                state.featuresEnabled.push(action.payload);
            }
        },
        // REMOVE FEATURE
        removeFeatureSuccess(state, action) {
            state.featuresEnabled = state.featuresEnabled.filter((feature) => feature.name !== action.payload);
        }
    }
});

// Reducer
export default slice.reducer;

export function addFeatures(features) {
    return async () => {
        try {
            for (let i = 0; i < features.length; i++) {
                const feature = features[i];
                dispatch(slice.actions.addFeatureSuccess(feature));
            }
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function removeFeature(feature) {
    return async () => {
        try {
            dispatch(slice.actions.removeFeatureSuccess(feature));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
