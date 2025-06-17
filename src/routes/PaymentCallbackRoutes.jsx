import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import ErrorBoundary from './ErrorBoundary';

// project imports
const PaymentSuccess = Loadable(lazy(() => import('views/pages/payment/PaymentSuccess')));
const PaymentError = Loadable(lazy(() => import('views/pages/payment/PaymentError')));

const PaymentCallbackRoutes = {
    path: '/payment',
    errorElement: <ErrorBoundary />,
    children: [
        {
            path: 'success',
            element: <PaymentSuccess />
        },
        {
            path: 'error',
            element: <PaymentError />
        }
    ]
};

export default PaymentCallbackRoutes;