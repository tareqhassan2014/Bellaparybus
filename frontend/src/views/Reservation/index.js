import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React from 'react';
import { useSelector } from 'react-redux';
import ConfirmInformation from '../../components/BookingVehicles/ConfirmInformation/ConfirmInformation';
import RideDetailStep from '../../components/BookingVehicles/RideDetailForms/RideDetailStep';
import VehiclesDetailStep from '../../components/BookingVehicles/VehicleDetailForm/VehiclesDetailStep';

const steps = ['Enter Ride Details', 'Choose A Vehicle', 'Confirm Reservation'];

const BookingVehicles = () => {
    const { step } = useSelector((state) => ({
        step: state.bookingVehicles.step,
    }));
    return (
        <>
            <Box sx={{ width: '100%', marginBottom: 3 }}>
                <Stepper activeStep={step - 1} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {step === 1 && <RideDetailStep />}
            {step === 2 && <VehiclesDetailStep />}
            {step === 3 && <ConfirmInformation />}
        </>
    );
};

export default BookingVehicles;
