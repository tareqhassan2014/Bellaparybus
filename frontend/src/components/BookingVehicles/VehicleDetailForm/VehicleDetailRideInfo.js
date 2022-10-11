import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RIDE_TYPE_MAP_DISPLAY } from '../../../common/constant';
import { formatDateString } from '../../../helpers/timeHelpers';

const VehicleDetailRideInfo = () => {
    const { rideInfo } = useSelector((state) => ({
        rideInfo: state.bookingVehicles.rideInfo,
    }));

    return (
        <Box sx={{ border: '1px dashed grey', padding: 2, marginBottom: 2 }}>
            <Typography variant="h5" textAlign="center" marginBottom={3}>
                Ride Information
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    Ride type: {RIDE_TYPE_MAP_DISPLAY[rideInfo.type]}
                </Grid>
                <Grid item xs={6}>
                    Pickup Time: {formatDateString(rideInfo.pickupDate)}{' '}
                    {formatDateString(rideInfo.pickupTime, 'HH:mm')}
                </Grid>
                <Grid item xs={6}>
                    Passengers: {rideInfo.passengers}
                </Grid>

                <Grid item xs={6}>
                    Duration: {rideInfo.duration}
                </Grid>
                <Grid item xs={6}>
                    Pickup Location: {rideInfo.pickupLocation}
                </Grid>
                <Grid item xs={6}>
                    Drop-off location: {rideInfo.dropOffLocation}
                </Grid>
                <Grid item xs={6}>
                    Occasion: {rideInfo.occasion}
                </Grid>
                <Grid item xs={6}>
                    Code: {rideInfo.code}
                </Grid>
            </Grid>
        </Box>
    );
};

export default VehicleDetailRideInfo;
