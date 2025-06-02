import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import ErrorBoundary from './ErrorBoundary';

// project imports
const LandingPage = Loadable(lazy(() => import('views/pages/landing')));

const LandingRoutes = {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorBoundary />
};

export default LandingRoutes;
