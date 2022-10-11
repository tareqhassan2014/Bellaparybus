import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "../../TabPanel";
import RideDetailHourly from "./RideDetailHourly";
import RideDetailOneWay from "./RideDetailOneWay";
import RideDetailRoundTrip from "./RideDetailRoundTrip";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_BOOKING_STEP, CHANGE_RIDE_INFO_TYPE, RESET_RIDE_DETAIL} from "../../../store/actionTypes";
import {RIDE_TYPE} from "../../../common/constant";
import {validateRequired, validateValue} from "../../../helpers/validateHelper";

const TAB_PANEL_ID_PREFIX = 'Booking-type-panel';
const TAB_ID_PREFIX = 'Booking-type';

const requireValidators = [validateRequired()];

const validateRideDetail = (rideInfo) => {
    if (rideInfo.type === RIDE_TYPE.ROUND_TRIP) {
        return validateValue(rideInfo.firstRide.pickupLocation, requireValidators)
            && validateValue(rideInfo.returnRide.pickupLocation, requireValidators)
    }

    return validateValue(rideInfo.pickupLocation, requireValidators)
}

function a11yProps(index) {
    return {
        id: `${TAB_ID_PREFIX}-${index}`,
        'aria-controls': `${TAB_PANEL_ID_PREFIX}-${index}`,
    };
}

const RideDetailStep = () => {
    const {rideType, rideInfo} = useSelector((state) => ({
        rideType: state.bookingVehicles.rideInfo.type,
        rideInfo: state.bookingVehicles.rideInfo
    }))

    const [isValidateAllowed, setIsvalidatingAllowed] = useState(false)

    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
        setIsvalidatingAllowed(false)
        dispatch({
            type: RESET_RIDE_DETAIL
        })
        dispatch({
            type: CHANGE_RIDE_INFO_TYPE,
            payload: newValue
        })
    };

    const handleHandleNextClick = () => {
        setIsvalidatingAllowed(true)

        if (!validateRideDetail(rideInfo)) {
            return;
        }
        dispatch({
            type: CHANGE_BOOKING_STEP,
            payload: 2
        })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={rideType} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Hourly" {...a11yProps(0)} />
                    <Tab label="One Way" {...a11yProps(1)} />
                    <Tab label="Round Trip" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <h3>Schedule a Ride (required)</h3>
            <TabPanel value={rideType} index={0}>
                <RideDetailHourly isValidateAllowed={isValidateAllowed}  />
            </TabPanel>
            <TabPanel value={rideType} index={1}>
                <RideDetailOneWay isValidateAllowed={isValidateAllowed}/>
            </TabPanel>
            <TabPanel value={rideType} index={2}>
                <RideDetailRoundTrip isValidateAllowed={isValidateAllowed}/>
            </TabPanel>

            <Box sx={{ '& button': { m: 1 }, marginTop: 3, textAlign: 'center' }} >
                <Button variant="contained" color='success' onClick={handleHandleNextClick}>Next</Button>
            </Box>
        </Box>
    );
};

export default RideDetailStep;