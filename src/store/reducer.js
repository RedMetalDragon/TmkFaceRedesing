// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import menuReducer from './slices/menu';
import features from './slices/features';
import attendance from './slices/attendance';
import contentFeeder from './slices/contentFeeder';
import orgSchedules from './slices/orgSchedules';
import createAccount from './slices/createAccount';
import punchInOut from './slices/punchInOut';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'tmk-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    contact: contactReducer,
    product: productReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    user: persistReducer(
        {
            key: 'user',
            storage,
            keyPrefix: 'tmk-'
        },
        userReducer
    ),
    menu: menuReducer,
    features: features,
    attendance: attendance,
    orgSchedules: orgSchedules,
    contentFeeder: contentFeeder,
    createAccount: createAccount,
    punchInOut: persistReducer(
        {
            key: 'punchInOut',
            storage,
            keyPrefix: 'tmk-'
        },
        punchInOut
    )
});

export default reducer;
