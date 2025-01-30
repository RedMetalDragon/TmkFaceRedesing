import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';
import { useDispatch } from 'store';
import { fillUserInfo } from 'store/slices/user';
// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// ==============================|| Mock Features to test ||============================== //
const mockFeature = {
    name: 'Calendar',
    route: '/apps/calendar',
    icon: '../assets/bar-chart-outline.svg'
};

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    features: [],
    user_id: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('access_token', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('access_token');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const dispatchUserInfo = useDispatch();

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('access_token');
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    dispatch({
                        type: LOGIN,
                        payload: {
                            ...state,
                            isLoggedIn: true
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email_address, password) => {
        try {
            const responseLogin = await axios.post('/brain/users/login', { email_address, password });
            if (responseLogin.status === 200) {
                const { access_token } = responseLogin.data;
                var role_features = [];
                role_features.push(mockFeature);
                setSession(access_token);
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        features: role_features,
                        user_id: responseLogin.data.user_id
                    }
                });
                dispatchUserInfo(fillUserInfo(responseLogin.data.user_id));
            } else {
                console.error('Login failed with status:', response.status);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // This is a comment for testing the git tag command

    const register = async (email, password, firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post('/api/account/register', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = async (email) => {
        console.log(email);
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    const hasAccess = (route) => {
        console.log(route);
        return true;
        //return state.features.some((feature) => route.includes(feature.route));
    };

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, hasAccess }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
