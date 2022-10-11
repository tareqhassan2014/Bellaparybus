import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateString } from '../../../helpers/timeHelpers';
import { CHANGE_BOOKING_STEP } from '../../../store/actionTypes';

const ConfirmInformation = () => {
    const { rideInfo, vehiclesDetails, bookingVehicles } = useSelector(
        (state) => ({
            rideInfo: state.bookingVehicles.rideInfo,
            vehiclesDetails: state.bookingVehicles.vehiclesDetails,
            bookingVehicles: state.bookingVehicles,
        })
    );

    const dispatch = useDispatch();

    const handleBackClick = () => {
        dispatch({
            type: CHANGE_BOOKING_STEP,
            payload: 2,
        });
    };

    return (
        <Container>
            <Box sx={{ marginBottom: 3 }}>
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h5">Ride Information</Typography>
                        <p>
                            Pickup Time: {formatDateString(rideInfo.pickupDate)}{' '}
                            {formatDateString(rideInfo.pickupTime, 'HH:mm')}
                        </p>
                        <p>Passengers: {rideInfo.passengers}</p>
                        <p>Duration: {rideInfo.duration}</p>
                        <p>Pickup Location: {rideInfo.pickupLocation}</p>
                        <p>Drop-off location: {rideInfo.dropOffLocation}</p>
                        <p>Occasion: {rideInfo.occasion}</p>
                        <p>Code: {rideInfo.code}</p>
                    </Grid>

                    <Grid xs={6}>
                        <Typography variant="h5">
                            Vehicles Information
                        </Typography>
                        <p>
                            Name: {vehiclesDetails.firstName}{' '}
                            {vehiclesDetails.lastName}
                        </p>
                        <p>Email: {vehiclesDetails.email}</p>
                        <p>Phone Number: {vehiclesDetails.phon}</p>
                        <p>
                            Vehicle Types: {vehiclesDetails.vehicleTypes.join()}
                        </p>
                        <p>
                            Special Requests: {vehiclesDetails.specialRequest}
                        </p>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{ '& button': { m: 1 }, marginTop: 3, textAlign: 'center' }}
            >
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleBackClick}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => console.log(bookingVehicles)}
                >
                    Confirm
                </Button>
            </Box>
        </Container>
    );
};

export default ConfirmInformation;
