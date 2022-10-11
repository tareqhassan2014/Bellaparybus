import React from 'react';
import {TimePicker} from "@mui/lab";
import TextField from "@mui/material/TextField";

const TimePickerInput = (props) => {
    const {label, value, onChange} = props;
    return (
        <TimePicker
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField fullWidth {...params} />} />
    );
};

export default TimePickerInput;
