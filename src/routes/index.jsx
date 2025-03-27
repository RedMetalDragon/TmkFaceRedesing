import { createBrowserRouter } from 'react-router-dom';

// routes
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ApplicationRoutes from './ApplicationRoutes';
import LandingRoutes from './LandingRoutes';
import StripeRoutes from './StripeRoutes';
import PaymentCallbackRoutes from './PaymentCallbackRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([StripeRoutes, PaymentCallbackRoutes, LandingRoutes, ApplicationRoutes, LoginRoutes, AuthenticationRoutes], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
