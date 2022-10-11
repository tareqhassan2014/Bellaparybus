import {combineReducers} from 'redux';
import bookingVehicles from "./reducers/bookingVehicles";
import auth from "./reducers/auth";
import accountInfo from "./reducers/accountInfo";

export default combineReducers({
    accountInfo,
    bookingVehicles,
    auth
})