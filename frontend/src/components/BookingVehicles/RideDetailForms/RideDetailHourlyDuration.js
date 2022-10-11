import React from 'react';
import {FormControl} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const DURATION_VALUES = Array.from(Array(24).keys()).map(ele => `${ele + 1} hour${ele + 1 > 1 ? 's' : ''}`)

const RideDetailHourlyDuration = (props) => {
    const {value, onChange, isExtra} = props;

    const handleSelectValueChange = (event) => {
        onChange(event.target.value)
    }
    console.log(isExtra ? 'Extra time' : 'Duration')

    return (
        <FormControl fullWidth>
            <InputLabel id="ride-hourly-duration">{isExtra ? 'Extra time' : 'Duration'}</InputLabel>
            <Select
                labelId="ride-hourly-duration"
                label={isExtra ? 'Extra time' : 'Duration'}
                value={value}
                onChange={handleSelectValueChange}
            >
                {DURATION_VALUES.map((duration, index) =>
                    <MenuItem key={index} value={duration}>{duration}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default RideDetailHourlyDuration;