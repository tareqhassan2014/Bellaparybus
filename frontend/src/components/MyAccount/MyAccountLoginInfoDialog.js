import React, {useEffect, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {isHasErrorByErrorObj, mapValueToErrorMessage, validateRequired} from "../../helpers/validateHelper";

const loginInfoValidators = {
    currentPassword: [validateRequired()],
    newPassword: [validateRequired()],
}

const MyAccountLoginInfoDialog = ({isOpen, onClose}) => {
    const [values, setValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState(() => ({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    }))

    useEffect(() => {
        if (!isOpen) {
            return
        }
        setValues({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
        setErrors({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
    }, [isOpen])

    const handleValueChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const validateForm = () => {
        const newErrorMessages = mapValueToErrorMessage(values, loginInfoValidators);
        newErrorMessages.confirmPassword = values.confirmPassword !== values.newPassword ? 'Password does not match' : ''
        setErrors(newErrorMessages);


        return !isHasErrorByErrorObj(newErrorMessages);
    }

    const handleOnSubmit = () => {
        if (!validateForm()) {
            return;
        }

        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle>
                Change Password
            </DialogTitle>
            <DialogContent >
                <Box marginTop={2} marginBottom={2}>
                    <TextField error={!!errors.currentPassword} helperText={errors.currentPassword} onChange={handleValueChange} value={values.currentPassword}  name='currentPassword' label='Current Password' type='password' fullWidth/>
                </Box>
                <Box marginBottom={2}>
                    <TextField error={!!errors.newPassword} helperText={errors.newPassword} onChange={handleValueChange} value={values.newPassword} name='newPassword' label='New Password' type='password' fullWidth/>
                </Box>
                <Box marginBottom={2}>
                    <TextField error={!!errors.confirmPassword} helperText={errors.confirmPassword} onChange={handleValueChange} value={values.confirmPassword} name='confirmPassword' label='Confirm Password' type='password' fullWidth/>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleOnSubmit} variant='contained'>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyAccountLoginInfoDialog;