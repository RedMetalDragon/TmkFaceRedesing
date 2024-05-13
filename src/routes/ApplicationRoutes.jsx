import React from 'react';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('views/application/users/account-profile/Profile1')));
const AppUserSchedule = Loadable(lazy(() => import('views/application/users/schedule')));

const ApplicationRoutes = {
    path: '/app',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
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
        }
    ]
};

export default ApplicationRoutes;
