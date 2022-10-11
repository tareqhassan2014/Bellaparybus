import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import LocationInput from "./LocationInput";
import {getErrorValidateMessage, validateRequired} from "../helpers/validateHelper";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";


const pickupLocationValidators = [validateRequired()];

const LocationInputGroup = (props) => {
    const {values, onChange, hasSameLocationCheckbox, isValidateAllowed} = props;
    const [isSameLocation, setIsSameLocation] = useState(hasSameLocationCheckbox)

    const {pickupLocation, dropOffLocation} = values;

    useEffect(() => {
        if (isSameLocation) {
            handleDropOffChange(pickupLocation)
        }
        // eslint-disable-next-line
    }, [isSameLocation]);

    const handlePickupChange = (value) => {
        onChange({
            pickupLocation: value
        });

        if (isSameLocation) {
            handleDropOffChange(value)
        }
    }

    const handleDropOffChange = (value) => {
        onChange({
            dropOffLocation: value
        })
    }

    const handleCheckboxChange = (event) => {
        setIsSameLocation(event.target.checked)
    }

    const errors = isValidateAllowed ? {
        pickupLocation: getErrorValidateMessage(pickupLocation, pickupLocationValidators)
    } : {}

    return (
        <Grid container item spacing={2}>
            <Grid item xs={6}>
                <LocationInput
                    error={!!errors.pickupLocation}
                    errorMessage={errors.pickupLocation}
                    onChange={handlePickupChange}
                    value={pickupLocation}
                    label="Pickup location"/>
            </Grid>

            <Grid item xs={6}>
                <LocationInput disabled={isSameLocation} onChange={handleDropOffChange} value={dropOffLocation} label="Drop-off location"/>
                { hasSameLocationCheckbox && <FormControlLabel checked={isSameLocation} onChange={handleCheckboxChange}
                                   control={<Checkbox defaultChecked/>} label="same as pickup location"/>}
            </Grid>
        </Grid>
    );
};

export default LocationInputGroup;