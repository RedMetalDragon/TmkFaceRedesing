// action - state management
import { LOGIN, LOGOUT, REMAINLOGGEDIN } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    features: [],
    user_id: null
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const { features } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                features: features,
                user_id: action.payload.user_id
            };
        }
        case REMAINLOGGEDIN: {
            return {
                ...state,
                isLoggedIn: true
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
