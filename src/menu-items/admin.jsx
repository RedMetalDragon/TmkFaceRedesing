// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Build } from '@mui/icons-material';

// constant
const icons = {
    Build
};

// ==============================||ADMIN MENU ITEMS ||============================== //

const admin = {
    id: 'admin',
    title: <FormattedMessage id="admin" />,
    type: 'group',
    children: [
        {
            id: 'settings',
            title: <FormattedMessage id="settings" />,
            type: 'item',
            url: '/app/user/admin/settings',
            icon: icons.Build
        }
    ]
};

export default admin;
