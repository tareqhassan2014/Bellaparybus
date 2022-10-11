import {RIDE_TYPE} from "../../common/constant";
import {
    CHANGE_BOOKING_STEP,
    CHANGE_RIDE_INFO_TYPE,
    RESET_RIDE_DETAIL,
    UPDATE_RIDE_DETAIL,
    UPDATE_RIDE_DETAIL_FIRST_RIDE,
    UPDATE_RIDE_DETAIL_RETURN_RIDE, UPDATE_VEHICLE_DETAIL
} from "../actionTypes";

const initialRideInfo = {
    pickupDate: new Date(),
    pickupTime: new Date(),
    passengers: 1,
    duration: '',
    pickupLocation: '',
    dropOffLocation: '',
    occasion: '',
    code: '',
    firstRide: {
        pickupDate: new Date(),
        pickupTime: new Date(),
        passengers: 1,
        duration: '',
        pickupLocation: '',
        dropOffLocation: '',
    },
    returnRide: {
        pickupDate: new Date(),
        pickupTime: new Date(),
        passengers: 1,
        duration: '',
        pickupLocation: '',
        dropOffLocation: '',
    },
}

const initialState = {
    step: 1,
    rideInfo: {
        type: RIDE_TYPE.HOURLY,
        ...initialRideInfo
    },
    vehiclesDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isPreferEmail: true,
        vehicleTypes: [],
        specialRequest: ''
    }
}

const bookingVehicles = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RIDE_DETAIL: {
            return {
                ...state,
                rideInfo: {
                    ...state.rideInfo,
                    ...action.payload
                }
            }
        }

        case UPDATE_RIDE_DETAIL_FIRST_RIDE: {
            return {
                ...state,
                rideInfo: {
                    ...state.rideInfo,
                    firstRide: {
                        ...state.rideInfo.firstRide,
                        ...action.payload
                    }
                }
            }
        }

        case UPDATE_RIDE_DETAIL_RETURN_RIDE: {
            return {
                ...state,
                rideInfo: {
                    ...state.rideInfo,
                    returnRide: {
                        ...state.rideInfo.returnRide,
                        ...action.payload
                    }
                }
            }
        }

        case RESET_RIDE_DETAIL: {
            return {
                ...state,
                rideInfo: {
                    ...state.rideInfo,
                    ...initialRideInfo,
                }
            }
        }

        case CHANGE_RIDE_INFO_TYPE: {
            return {
                ...state,
                rideInfo: {
                    ...state.rideInfo,
                    type: action.payload
                }
            }
        }

        case CHANGE_BOOKING_STEP: {
            return {
                ...state,
                step: action.payload
            }
        }

        case UPDATE_VEHICLE_DETAIL: {
            return {
                ...state,
                vehiclesDetails: {
                    ...state.vehiclesDetails,
                    ...action.payload
                }
            }
        }
        default:
            return state;
    }
}


export default bookingVehicles;
