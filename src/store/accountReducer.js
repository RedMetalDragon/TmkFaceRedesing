// action - state management
import { LOGIN, LOGOUT, REGISTER, SET_USER_FEATURES } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    features: [],
    personalData: {}
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
            };
        }
        case SET_USER_FEATURES: {
            const { features } = action.payload;
            return {
                ...state,
                features: features
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
