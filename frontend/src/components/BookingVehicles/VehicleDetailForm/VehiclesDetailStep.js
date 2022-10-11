import React, {useState} from 'react';
import ContactDetailInputs from "./ContactDetailInputs";
import VehicleCheckboxes from "./VehicleCheckboxes";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_BOOKING_STEP, UPDATE_VEHICLE_DETAIL} from "../../../store/actionTypes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {validateRequired, validateValue} from "../../../helpers/validateHelper";
import VehicleDetailRideInfo from "./VehicleDetailRideInfo";

const requiredValidators = [validateRequired()];

const validateVehicleInfo = (vehicleInfo) => {
    const {firstName, lastName, email, phone} = vehicleInfo;
    return validateValue(firstName, requiredValidators)
        && validateValue(lastName, requiredValidators)
        && validateValue(email, requiredValidators)
        && validateValue(phone, requiredValidators)

}

const VehiclesDetailStep = () => {
    const {vehiclesDetails} = useSelector((state) => ({
        vehiclesDetails: state.bookingVehicles.vehiclesDetails
    }))

    const [isValidatingAllowed, setIsValidatingAllowed] = useState(false);

    const dispatch = useDispatch()

    const handleValuesChange = (payload) => {
        dispatch({
            type: UPDATE_VEHICLE_DETAIL,
            payload
        })
    }

    const handleBackClick = () => {
        dispatch({
            type: CHANGE_BOOKING_STEP,
            payload: 1
        })
    }


    const handleNextClick = () => {
        setIsValidatingAllowed(true);
        if (!validateVehicleInfo(vehiclesDetails)) {
            return;
        }
        dispatch({
            type: CHANGE_BOOKING_STEP,
            payload: 3
        })
    }

    return (
        <div>
            <VehicleDetailRideInfo />
            <ContactDetailInputs isValidatingAllowed={isValidatingAllowed} values={vehiclesDetails} onChange={handleValuesChange} />
            <VehicleCheckboxes values={vehiclesDetails} onChange={handleValuesChange} />

            <Box sx={{ '& button': { m: 1 }, marginTop: 3, textAlign: 'center' }} >
                <Button variant="contained" color='error' onClick={handleBackClick}>Back</Button>
                <Button variant="contained" color='success' onClick={handleNextClick}>Submit</Button>
            </Box>
        </div>
    );
};

export default VehiclesDetailStep;