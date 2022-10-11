import React from 'react';
import {Grid} from "@mui/material";
import OccationCodeInputs from "../../OccationCodeInputs";
import TimePassengersInputs from "../../TimePassengersInputs";
import LocationInputGroup from "../../LocationInputGroup";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_RIDE_DETAIL} from "../../../store/actionTypes";



const RideDetailHourly = (props) => {
    const {isValidateAllowed} = props;

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

    return (
        <Grid container spacing={2}>
            <TimePassengersInputs onChange={handleValueChange} values={rideInfo}/>
            <LocationInputGroup isValidateAllowed={isValidateAllowed} hasSameLocationCheckbox={true} onChange={handleValueChange} values={rideInfo} />
            <OccationCodeInputs onChange={handleValueChange} values={rideInfo}/>
        </Grid>
    );
};

export default RideDetailHourly;