import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import ErrorBoundary from './ErrorBoundary';

// project imports
//const StripePage = Loadable(lazy(() => import('views/pages/stripe')));
const GetStarted = Loadable(lazy(() => import('views/forms/forms-wizard/index')));
const StripeRoutes = {
    path: '/get-started',
    element: <GetStarted />,
    errorElement: <ErrorBoundary />
};

export default StripeRoutes;
