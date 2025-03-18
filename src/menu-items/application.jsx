// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconApps,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconFolder,
    IconReportMoney,
    IconFileText,
} from '@tabler/icons-react';

// constant
const icons = {
    IconApps,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconFolder,
    IconReportMoney
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    icon: icons.IconApps,
    type: 'group',
    route: '*',
    children: [
        {
            id: 'employee',
            title: <FormattedMessage id="employee" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            route: '/account-profile',
            children: [
                {
                    id: 'account-profile',
                    title: <FormattedMessage id="account-profile" />,
                    type: 'item',
                    route: '',
                    url: '/app/user/account-profile'
                }
                // {
                //     id: 'user-card',
                //     title: <FormattedMessage id="cards" />,
                //     type: 'collapse',
                //     route: '*user-card',
                //     children: [
                //         {
                //             id: 'card1',
                //             title: (
                //                 <>
                //                     <FormattedMessage id="style" /> 01
                //                 </>
                //             ),
                //             type: 'item',
                //             route: '*card1',
                //             url: '/apps/user/card/card1'
                //         },
                //         {
                //             id: 'card2',
                //             title: (
                //                 <>
                //                     <FormattedMessage id="style" /> 02
                //                 </>
                //             ),
                //             type: 'item',
                //             route: '*card2',
                //             url: '/apps/user/card/card2'
                //         },
                //         {
                //             id: 'card3',
                //             title: (
                //                 <>
                //                     <FormattedMessage id="style" /> 03
                //                 </>
                //             ),
                //             type: 'item',
                //             route: '*card3',
                //             url: '/apps/user/card/card3'
                //         }
                //     ]
                // },
                // {
                //     id: 'user-list',
                //     title: <FormattedMessage id="list" />,
                //     type: 'collapse',
                //     children: [
                //         {
                //             id: 'list1',
                //             title: (
                //                 <>
                //                     <FormattedMessage id="style" /> 01
                //                 </>
                //             ),
                //             type: 'item',
                //             url: '/apps/user/list/list1'
                //         },
                //         {
                //             id: 'list2',
                //             title: (
                //                 <>
                //                     <FormattedMessage id="style" /> 02
                //                 </>
                //             ),
                //             type: 'item',
                //             url: '/apps/user/list/list2'
                //         }
                //     ]
                // }
            ]
        },
        {
            id: 'time-management',
            title: <FormattedMessage id="time-management" />,
            type: 'collapse',
            route: '/time_management',
            icon: icons.IconCalendar,
            children: [
                {
                    id: 'clockInOut',
                    title: <FormattedMessage id="clockInOut" />,
                    type: 'item',
                    route: '/punch-in-out',
                    url: '/app/user/punch-in-out'
                },
                {
                    id: 'attendance',
                    title: <FormattedMessage id="user-attendance" />,
                    type: 'item',
                    route: '/punch-in-out',
                    url: '/app/user/schedule-attendance'
                },
                {
                    id: 'view-schedule',
                    title: <FormattedMessage id="view-schedule" />,
                    type: 'item',
                    route: '/view-schedule',
                    url: '/app/user/schedule-view-schedule'
                }
                // {
                //     id: 'create-schedule',
                //     title: <FormattedMessage id="create-schedule" />,
                //     type: 'item',
                //     route: '/create-schedule',
                //     url: '/app/manager/schedule/create-schedule'
                // },
                // {
                //     id: 'order-list',
                //     title: <FormattedMessage id="order-list" />,
                //     type: 'item',
                //     route: '*order-list',
                //     url: '/app/customer/order-list',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'create-invoice',
                //     title: <FormattedMessage id="create-invoice" />,
                //     type: 'item',
                //     route: '*create-invoice',
                //     url: '/app/customer/create-invoice',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'order-details',
                //     title: <FormattedMessage id="order-details" />,
                //     type: 'item',
                //     route: '*order-details',
                //     url: '/app/customer/order-details'
                // },
                // {
                //     id: 'product',
                //     title: <FormattedMessage id="product" />,
                //     type: 'item',
                //     route: '*product',
                //     url: '/app/customer/product',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'product-review',
                //     title: <FormattedMessage id="product-review" />,
                //     type: 'item',
                //     route: '*product-review',
                //     url: '/apps/customer/product-review',
                //     breadcrumbs: false
                // }
            ]
        },
        {
            id: 'payroll',
            title: <FormattedMessage id="payroll" />,
            type: 'item',
            route: '/payroll',
            url: '/app/user/payroll',
            icon: icons.IconReportMoney
        },
        {
            id: 'documents',
            title: <FormattedMessage id="documents" />,
            type: 'collapse',
            route: '/documents',
            icon: icons.IconFolder,
            children: [
                {
                    id: 'all-files',
                    title: <FormattedMessage id="all-files" />,
                    type: 'item',
                    route: '/all-files',
                    url: '/app/user/documents/all-files'
                },
                {
                    id: 'shared-with-my',
                    title: <FormattedMessage id="shared-with-my" />,
                    type: 'item',
                    route: '/shared-with-my',
                    url: '/app/user/documents/shared-with-my'
                },
                {
                    id: 'recent',
                    title: <FormattedMessage id="recent" />,
                    type: 'item',
                    route: '/recent',
                    url: '/app/user/documents/recent'
                },
                {
                    id: 'starred',
                    title: <FormattedMessage id="starred" />,
                    type: 'item',
                    route: '/starred',
                    url: '/app/user/documents/starred'
                },
                {
                    id: 'trash',
                    title: <FormattedMessage id="trash" />,
                    type: 'item',
                    route: '/trash',
                    url: '/app/user/documents/trash'
                }
            ]
        }
        // {
        //     id: 'chat',
        //     title: <FormattedMessage id="chat" />,
        //     type: 'item',
        //     icon: icons.IconMessages,
        //     url: '/apps/chat'
        // },
        // {
        //     id: 'kanban',
        //     title: 'Kanban',
        //     type: 'item',
        //     icon: icons.IconLayoutKanban,
        //     url: '/apps/kanban/board'
        // },
        // {
        //     id: 'mail',
        //     title: <FormattedMessage id="mail" />,
        //     type: 'item',
        //     icon: icons.IconMail,
        //     url: '/apps/mail'
        // },
        // {
        //     id: 'calendar',
        //     title: <FormattedMessage id="calendar" />,
        //     type: 'item',
        //     url: '/apps/calendar',
        //     icon: icons.IconCalendar
        // },
        // {
        //     id: 'contact',
        //     title: <FormattedMessage id="contact" />,
        //     type: 'collapse',
        //     icon: icons.IconNfc,
        //     children: [
        //         {
        //             id: 'c-card',
        //             title: <FormattedMessage id="cards" />,
        //             type: 'item',
        //             url: '/apps/contact/c-card',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'c-list',
        //             title: <FormattedMessage id="list" />,
        //             type: 'item',
        //             url: '/apps/contact/c-list',
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        // {
        //     id: 'e-commerce',
        //     title: <FormattedMessage id="e-commerce" />,
        //     type: 'collapse',
        //     icon: icons.IconBasket,
        //     children: [
        //         {
        //             id: 'products',
        //             title: <FormattedMessage id="products" />,
        //             type: 'item',
        //             url: '/apps/e-commerce/products'
        //         },
        //         {
        //             id: 'product-details',
        //             title: <FormattedMessage id="product-details" />,
        //             type: 'item',
        //             url: '/apps/e-commerce/product-details/1',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'product-list',
        //             title: <FormattedMessage id="product-list" />,
        //             type: 'item',
        //             url: '/apps/e-commerce/product-list',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'checkout',
        //             title: <FormattedMessage id="checkout" />,
        //             type: 'item',
        //             url: '/apps/e-commerce/checkout'
        //         }
        //     ]
        // }
    ]
};

export default application;
