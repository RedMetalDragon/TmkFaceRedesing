import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import RestrictedAccessDialog from 'ui-component/dialogs/RestrictedAcces';
// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { isLoggedIn, features, hasAccess } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true });
            return;
        }
    }, [isLoggedIn, navigate, features]);

    return hasAccess(window.location.href) && isLoggedIn ? children : <RestrictedAccessDialog></RestrictedAccessDialog>;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
