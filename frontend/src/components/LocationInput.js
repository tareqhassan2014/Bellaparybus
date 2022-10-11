import React from 'react';
import TextField from "@mui/material/TextField";

const LocationInput = (props) => {
    const {label, value, onChange, error, errorMessage, disabled} = props;

    const handleInputChange = (event) => {
        onChange(event.target.value)
    }

    return (
        <TextField disabled={disabled} error={error} helperText={errorMessage} value={value} onChange={handleInputChange} label={label} fullWidth />
    );
};

export default LocationInput;