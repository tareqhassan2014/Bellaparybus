import React from 'react';
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const PassengerInput = (props) => {
    const {value, onChange} = props;

    const handleInputChange = (event) => {
        const targetValue = event.target.value;
        if (/^\d+$/.test(targetValue)) {
            onChange(parseInt(targetValue))
        }
    }



    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs>
                <TextField
                    type='number'
                    label='Passengers'
                    value={value}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <AirlineSeatReclineExtraIcon/>
                        </InputAdornment>,
                    }}
                />
            </Grid>

            <Grid item xs='auto'>
                <IconButton onClick={() => onChange(value + 1)}>
                    <AddIcon />
                </IconButton>
            </Grid>
            <Grid item xs='auto'>
                <IconButton onClick={() => onChange(value - 1)}>
                    <RemoveIcon />
                </IconButton>
            </Grid>

        </Grid>
    );
};

export default PassengerInput;
