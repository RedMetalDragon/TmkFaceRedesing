import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
const StripePage = Loadable(lazy(() => import('views/pages/stripe')));

const StripeRoutes = {
    path: '/pricing',
    element: <StripePage />
};

export default StripeRoutes;
