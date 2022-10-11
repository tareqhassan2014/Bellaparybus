import React from 'react';
import {DatePicker} from "@mui/lab";
import TextField from "@mui/material/TextField";

const DatePickerInput = (props) => {
    const {label, onChange, value} = props;

    return (
        <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            inputFormat='dd/MM/yyyy'
            renderInput={(params) => <TextField fullWidth {...params} />}
        />
    );
};

export default DatePickerInput;
