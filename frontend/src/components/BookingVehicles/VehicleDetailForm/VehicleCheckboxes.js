import React from 'react';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const VEHICLE_VALUE = ['Sedan', 'Stretch Limo', 'Van', 'Party Bus', 'Motor Coach', 'SUV', 'Stretch SUV'];

const VehicleCheckboxes = (props) => {
    const {values, onChange} = props;
    const {vehicleTypes, specialRequest} = values;

    const handleCheckBoxChange = (event) => {
        let newVehicleTypes;
        if (event.target.checked) {
            newVehicleTypes = [...vehicleTypes, event.target.value];
        } else {
            newVehicleTypes = vehicleTypes.filter((item) => item !== event.target.value);
        }

        onChange({
            vehicleTypes: newVehicleTypes
        })
    }

    const handleSpecialRequestChange = (event) => {
        onChange({
            specialRequest: event.target.value
        })
    }

    return (
        <Box>
            <Typography variant='h5'>Vehicle Preferences</Typography>
            <Typography variant='h6'>Vehicle Type</Typography>
            <Grid container spacing={2} marginBottom={3}>
                {VEHICLE_VALUE.map((value, index) => (
                    <Grid item width='20%' key={index}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={value}
                                    checked={vehicleTypes.some((vehicle) => vehicle === value)}
                                    defaultChecked
                                    onChange={handleCheckBoxChange}
                                />}
                            label={value}/>
                    </Grid>
                ))}
            </Grid>

            <Typography variant='h6'>Special Requests</Typography>
            <TextField
                fullWidth
                multiline
                value={specialRequest}
                onChange={handleSpecialRequestChange}
                rows={4}
            />
        </Box>
    );
};

export default VehicleCheckboxes;
