import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {getErrorValidateMessage, validateRequired} from "../../../helpers/validateHelper";

const requireValidators = [validateRequired()]

const ContactDetailInputs = (props) => {
    const {onChange, values, isValidatingAllowed} = props;
    const {firstName, lastName, email, phone, isPreferEmail} = values;

    const handleFirstNameChange = (event) => {
        onChange({
            firstName: event.target.value
        })
    }

    const handleLastNameChange = (event) => {
        onChange({
            lastName: event.target.value
        })
    }

    const handleEmailChange = (event) => {
        onChange({
            email: event.target.value
        })
    }

    const handlePhoneChange = (event) => {
        onChange({
            phone: event.target.value
        })
    }

    const handlePhoneRadioChange = (event) => {
        onChange({
            isPreferEmail: !event.target.checked
        })
    }

    const handleEmailRadioChange = (event) => {
        onChange({
            isPreferEmail: event.target.checked
        })
    }

    const errors = isValidatingAllowed ? {
        firstName: getErrorValidateMessage(firstName, requireValidators),
        lastName: getErrorValidateMessage(lastName, requireValidators),
        email: getErrorValidateMessage(email, requireValidators),
        phone: getErrorValidateMessage(phone, requireValidators),
    } : {}

    return (
        <Box sx={{marginBottom: 3}}>
            <Typography variant='h5'>Contact Information</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField error={!!errors.firstName} helperText={errors.firstName} value={firstName} onChange={handleFirstNameChange} fullWidth label='First Name'/>
                </Grid>
                <Grid item xs={6}>
                    <TextField error={!!errors.lastName} helperText={errors.lastName} value={lastName} onChange={handleLastNameChange} fullWidth label='Last Name'/>
                </Grid>
                <Grid item xs={6}>
                    <TextField error={!!errors.email} helperText={errors.email} value={email} onChange={handleEmailChange} fullWidth label='Email Address'/>
                </Grid>
                <Grid item xs={6}>
                    <TextField error={!!errors.phone} helperText={errors.phone} value={phone} onChange={handlePhoneChange} fullWidth label='Phone Number'/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems='center'>
                        <Grid item xs='auto' marginRight={2}>
                            <p>Preferred Contact Method:</p>
                        </Grid>
                        <Grid item xs='auto'>
                            <FormControlLabel control={<Radio onChange={handleEmailRadioChange} checked={isPreferEmail} />} label="Email" />
                        </Grid>
                        <Grid item xs='auto'>
                            <FormControlLabel control={<Radio onChange={handlePhoneRadioChange} checked={!isPreferEmail} />} label="Phone" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactDetailInputs;