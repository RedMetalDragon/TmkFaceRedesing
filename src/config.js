import LAYOUT_CONST from 'constant';
import { themeCustomizationEnabled, searchSectionEanbled } from './utils/globalConfig';
export const DASHBOARD_PATH = '/app/dashboard-default';
export const HORIZONTAL_MAX_ITEM = 7;

const config = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    searchBarVisible: searchSectionEanbled,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'sp'-Spanish 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false,
    assetsPath: import.meta.env.VITE_ASSETS_PATH || '/assets/',
    customizationEnabled: themeCustomizationEnabled
};

export default config;
