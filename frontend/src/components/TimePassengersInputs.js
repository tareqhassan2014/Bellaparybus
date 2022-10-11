import React from 'react';
import {Grid} from "@mui/material";
import DatePickerInput from "./DatePickerInput";
import TimePickerInput from "./TimePickerInput";
import PassengerInput from "./PassengerInput";
import RideDetailHourlyDuration from "./BookingVehicles/RideDetailForms/RideDetailHourlyDuration";

const TimePassengersInputs = (props) => {
    const {onChange, values, isExtra} = props;
    const {pickupDate, pickupTime, passengers, duration} = values;

    const handlePickupDateChange = (value) => {
        onChange({
            pickupDate: value
        })
    }

    const handlePickupTimeChange = (value) => {
        onChange({
            pickupTime: value
        })
    }

    const handlePassengerChange = (value) => {
        onChange({
            passengers: value
        })
    }

    const handleChangeDuration = (value) => {
        onChange({
            duration: value
        })
    }

    console.log(isExtra)

    return (
        <Grid container item spacing={2}>
            <Grid item xs={3}>
                <DatePickerInput value={pickupDate} label="Pickup date" onChange={handlePickupDateChange}/>
            </Grid>
            <Grid item xs={3}>
                <TimePickerInput value={pickupTime} onChange={handlePickupTimeChange} label="Pickup time"/>
            </Grid>
            <Grid item xs={3}>
                <PassengerInput onChange={handlePassengerChange} value={passengers}/>
            </Grid>

            <Grid item xs={3}>
                <RideDetailHourlyDuration isExtra={isExtra} onChange={handleChangeDuration} value={duration}/>
            </Grid>
        </Grid>
    );
};

export default TimePassengersInputs;