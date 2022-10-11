import React from 'react';
import Box from "@mui/material/Box";
import TimePassengersInputs from "../../TimePassengersInputs";
import LocationInputGroup from "../../LocationInputGroup";
import OccationCodeInputs from "../../OccationCodeInputs";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {
    UPDATE_RIDE_DETAIL,
    UPDATE_RIDE_DETAIL_FIRST_RIDE,
    UPDATE_RIDE_DETAIL_RETURN_RIDE
} from "../../../store/actionTypes";

const RideDetailRoundTrip = (props) => {
    const {isValidateAllowed} = props
    const {rideInfo} = useSelector((state) => ({
        rideInfo: state.bookingVehicles.rideInfo
    }))

    const dispatch = useDispatch();

    const handleValueChange = (values) => {
        dispatch({
            type: UPDATE_RIDE_DETAIL,
            payload: values,
        })
    }

    const handleFirstRideValueChange = (values) => {
        dispatch({
            type: UPDATE_RIDE_DETAIL_FIRST_RIDE,
            payload: values,
        })
    }

    const handleReturnRideValueChange = (values) => {
        dispatch({
            type: UPDATE_RIDE_DETAIL_RETURN_RIDE,
            payload: values,
        })
    }

    const {firstRide, returnRide} = rideInfo;

    return (
        <Box paddingTop={3}>
            <Grid container spacing={2} marginBottom={4}>
                <Typography paddingLeft={2} variant='h6'>First Ride</Typography>
                <TimePassengersInputs isExtra={true} values={firstRide} onChange={handleFirstRideValueChange}/>
                <LocationInputGroup isValidateAllowed={isValidateAllowed} values={firstRide} onChange={handleFirstRideValueChange}/>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Typography paddingLeft={2} variant='h6'>Return Ride</Typography>
                <TimePassengersInputs isExtra={true} values={returnRide} onChange={handleReturnRideValueChange} />
                <LocationInputGroup isValidateAllowed={isValidateAllowed} values={returnRide} onChange={handleReturnRideValueChange}/>
            </Grid>

            <OccationCodeInputs values={rideInfo} onChange={handleValueChange} />
        </Box>
    );
};

export default RideDetailRoundTrip;