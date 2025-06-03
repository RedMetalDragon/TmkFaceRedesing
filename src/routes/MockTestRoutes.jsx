import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
const OnBoardWizard = Loadable(lazy(() => import('views/forms/forms-wizard/OnBoardWizard')));
//const PaymentError = Loadable(lazy(() => import('views/pages/payment/PaymentError')));

const OnBoardRoutes = {
    path: '/mock',
    children: [
        {
            path: 'onboard-company',
            element: <OnBoardWizard />
        }
    ]
};

export default OnBoardRoutes;
