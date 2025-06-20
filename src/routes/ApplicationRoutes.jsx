import React from 'react';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('views/application/users/account-profile/Profile1')));
const AppUserSchedule = Loadable(lazy(() => import('views/application/users/schedule')));
const AppPunchInOut = Loadable(lazy(() => import('views/application/users/punch-in-out')));
const AppUserDocumentsAllFiles = Loadable(lazy(() => import('views/application/fileManagement/all-files')));

const ApplicationRoutes = {
    path: '/app',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    errorElement: <ErrorBoundary />,
    children: [
        {
            path: '/app/dashboard-default',
            element: <DashboardDefault />
        },
        {
            path: '/app/dashboard-analytics',
            element: <DashboardAnalytics />
        },
        {
            path: '/app/user/account-profile',
            element: <AppUserAccountProfile1 />
        },
        {
            path: '/app/user/schedule-attendance',
            element: <AppUserSchedule />
        },
        {
            path: '/app/user/punch-in-out',
            element: <AppPunchInOut />
        },
        {
            path: '/app/user/documents/all-files',
            element: <AppUserDocumentsAllFiles />
        }
    ]
};

export default ApplicationRoutes;
