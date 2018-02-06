import {Order, orderActions, orderReducers} from './order';
import {HomeView, BusinessDetail, homeActions, homeReducers} from './home';
import {Search, searchActions, searchReducers} from './search';
import {Footer, footerActions, footerReducers} from './footer';
import {Me, Setting, Login, OwnerPage, SignUp, ForgotPassword, AddressList, AddressEditor, meActions, meReducers} from './me';
import {headerActions, headerReducers} from './header';
import ErrorPage from './ErrorPage';

const actions = Object.assign({}, orderActions, homeActions, searchActions, footerActions, meActions, headerActions);
const reducers = Object.assign({}, orderReducers, homeReducers, searchReducers, footerReducers, meReducers, headerReducers);

export {
    HomeView,
    BusinessDetail,
    Order,
    Search,
    Footer,
    Me,
    SignUp,
    Setting,
    Login,
    OwnerPage,
    ForgotPassword,
    AddressList,
    AddressEditor,
    ErrorPage,
    actions,
    reducers
};
