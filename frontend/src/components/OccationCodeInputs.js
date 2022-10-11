import React from 'react';
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const OCCASION_VALUES = ['Airport', 'Anniversary'];

const OccationCodeInputs = (props) => {
    const {values, onChange} = props;

    const {occasion, code} = values;

    const handleSelectChange = (event) => {
        onChange({
            occasion: event.target.value
        })
    }


    const handleCodeChange = (event) => {
        onChange({
            code: event.target.value
        })
    }

    return (
        <Grid container item spacing={2}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="ride-occasion">Occasion</InputLabel>
                    <Select
                        labelId="ride-occasion"
                        label="Occasion"
                        value={occasion}
                        onChange={handleSelectChange}
                    >
                        {OCCASION_VALUES.map((value, index) =>
                            <MenuItem key={index} value={value}>{value}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <TextField onChange={handleCodeChange} value={code} fullWidth label="Coupon/Rate Code" />
            </Grid>
        </Grid>
    );
};

export default OccationCodeInputs;
