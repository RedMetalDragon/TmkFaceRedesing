import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
const LandingPage = Loadable(lazy(() => import('views/pages/landing')));

const LandingRoutes = {
    path: '/',
    element: <LandingPage />
};

export default LandingRoutes;
