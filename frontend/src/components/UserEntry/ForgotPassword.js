import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import {
    getErrorValidateMessage,
    validateEmail,
    validateRequired,
} from '../../helpers/validateHelper';
import { sendForgotPassword } from '../../services/authServices';

const emailValidators = [validateRequired(), validateEmail()];

const ForgotPassword = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleValueChange = (event) => {
        setEmail(event.target.value);
    };

    const validateForm = () => {
        const newErrorMessage = getErrorValidateMessage(email, emailValidators);
        setErrorMessage(newErrorMessage);

        return !newErrorMessage;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        await sendForgotPassword(email);
        window.alert('Please check your email to reset password');
        onSubmit();
    };

    return (
        <Box padding={3} minWidth="500px" textAlign="center">
            <Typography marginBottom={3} variant="h4">
                Forgot password
            </Typography>
            <TextField
                helperText={errorMessage}
                error={!!errorMessage}
                onChange={handleValueChange}
                name="email"
                value={email}
                fullWidth
                label="Email"
                InputProps={{
                    endAdornment: (
                        <Button onClick={handleSubmit}>Submit</Button>
                    ),
                }}
            />
        </Box>
    );
};

export default ForgotPassword;
