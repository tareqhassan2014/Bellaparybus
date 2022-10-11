import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
    isHasErrorByErrorObj,
    mapValueToErrorMessage,
    validatePhone,
    validateRequired
} from "../../helpers/validateHelper";
import {UPDATE_MY_ACCOUNT_USER_PROFILE} from "../../store/actionTypes";

const profileValidators = {
    firstName: [validateRequired()],
    phoneMobile: [validatePhone()],
    phoneWork: [validatePhone()],
    phoneHome: [validatePhone()]
}

const MyAccountUserProfileDialog = ({isOpen, onClose}) => {
    const {userProfile} = useSelector((state) => ({
        userProfile: state.accountInfo.userProfile
    }))
    const [values, setValues] = useState(userProfile);

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        company: '',
        phoneMobile: '',
        phoneWork: '',
        phoneHome: ''
    });
    const dispatch = useDispatch();

    useEffect(()  => {
        setValues(userProfile)
    }, [userProfile]);

    useEffect(() => {
        if (isOpen) {
            setValues(userProfile)
        }
        // eslint-disable-next-line
    }, [isOpen])

    const validateValues = () => {
        const newErrors = mapValueToErrorMessage(values, profileValidators);
        setErrors(newErrors);

        return !isHasErrorByErrorObj(newErrors);
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleUpdate = () => {
        if (!validateValues()) {
            return;
        }
        dispatch({
            type: UPDATE_MY_ACCOUNT_USER_PROFILE,
            payload: values
        })
        onClose();
    }

    return (
        <Dialog fullWidth maxWidth='sm' open={isOpen} onClose={onClose}>
            <DialogTitle>
                User Profile
            </DialogTitle>

            <DialogContent>
                <Box marginTop={2} marginBottom={2} >
                    <TextField
                        name='firstName'
                        label='First Name'
                        onChange={handleChange}
                        value={values.firstName}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                    />
                </Box>
                <Box marginTop={2} marginBottom={2} >
                    <TextField
                        name='lastName'
                        label='Last Name'
                        onChange={handleChange}
                        value={values.lastName}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                    />
                </Box>
                <Box marginTop={2} marginBottom={2} >
                    <TextField
                        name='company'
                        label='Company'
                        onChange={handleChange}
                        value={values.company}
                        error={!!errors.company}
                        helperText={errors.company}
                        fullWidth
                    />
                </Box>
                <Box marginTop={2} marginBottom={2} >
                    <TextField
                        name='phoneMobile'
                        label='Mobile Phone Number'
                        onChange={handleChange}
                        value={values.phoneMobile}
                        error={!!errors.phoneMobile}
                        helperText={errors.phoneMobile}
                        fullWidth
                    />
                </Box>
                <Box marginTop={2} marginBottom={2} >
                    <TextField
                        name='phoneWork'
                        label='Work Phone Number'
                        onChange={handleChange}
                        value={values.phoneWork}
                        error={!!errors.phoneWork}
                        helperText={errors.phoneWork}
                        fullWidth
                    />
                </Box>
                <Box marginTop={2} marginBottom={2} >
                    <TextField
                        name='phoneHome'
                        label='Home Phone Number'
                        onChange={handleChange}
                        value={values.phoneHome}
                        error={!!errors.phoneHome}
                        helperText={errors.phoneHome}
                        fullWidth
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleUpdate}>Update</Button>

            </DialogActions>
        </Dialog>
    );
};

export default MyAccountUserProfileDialog;