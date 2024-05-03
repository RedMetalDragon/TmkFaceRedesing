import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// project import
//import Loadable from 'ui-component/Loadable';

//const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, LoginRoutes, AuthenticationRoutes], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
