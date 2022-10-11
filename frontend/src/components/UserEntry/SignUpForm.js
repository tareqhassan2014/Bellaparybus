import React, {useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    isHasErrorByErrorObj,
    mapValueToErrorMessage,
    validateEmail,
    validateRequired
} from "../../helpers/validateHelper";
import {signUp} from "../../services/authServices";
import {SET_JWT} from "../../store/actionTypes";
import {useDispatch} from "react-redux";
import {Link, Typography} from "@mui/material";
import {USER_ENTRY_FORM_TYPE} from "../../common/constant";

const signUpValuesValidators = {
    email: [validateRequired(), validateEmail()],
    password: [validateRequired()],
    firstName: [validateRequired()],
    lastName: [validateRequired()],
    phone: [validateRequired()],
}

const SignUpForm = ({onSignUp, onChangeFormType}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: ''
    })

    const validateForm = () => {
        const newErrorMessages = mapValueToErrorMessage(values, signUpValuesValidators);
        newErrorMessages.confirmPassword = isPasswordMatching ? '' : 'Password is not match';

        setErrorMessages(newErrorMessages)

        return !isHasErrorByErrorObj(newErrorMessages);

    }
    const dispatch = useDispatch();


    const isPasswordMatching = values.password === values.confirmPassword;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const data = await signUp(values);
            if (data?.user?.token) {
                dispatch({
                    type: SET_JWT,
                    payload: data?.user?.token
                })
            }
            if (onSignUp) {
                onSignUp();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeFormTypeClick = (formType) => () => {
        onChangeFormType(formType);
    }

    return (
        <Box padding={3} minWidth='500px' textAlign='center'>
            <Typography marginBottom={3} variant='h4'>Sign Up</Typography>

            <form onSubmit={handleSubmit}>
                <Box marginBottom={3}>
                    <TextField
                        error={!!errorMessages.email} helperText={errorMessages.email} value={values.email}
                        onChange={handleInputChange} fullWidth label='Email' name='email'/>
                </Box>
                <Box marginBottom={3}>
                    <TextField
                        error={!!errorMessages.password} helperText={errorMessages.password}
                        value={values.password} onChange={handleInputChange} fullWidth label='Password'
                        name='password' type='password'/>
                </Box>
                <Box marginBottom={3}>
                    <TextField
                        error={!!errorMessages.confirmPassword}
                        helperText={errorMessages.confirmPassword}
                        value={values.confirmPassword} onChange={handleInputChange} fullWidth label='Confirm Password'
                        name='confirmPassword' type='password'/>
                </Box>
                <Box marginBottom={3}>
                    <TextField
                        error={!!errorMessages.firstName} helperText={errorMessages.firstName}
                        value={values.firstName} onChange={handleInputChange} fullWidth label='First Name'
                        name='firstName'/>
                </Box>
                <Box marginBottom={3}>
                    <TextField
                        error={!!errorMessages.lastName} helperText={errorMessages.lastName}
                        value={values.lastName} onChange={handleInputChange} fullWidth label='Last Name'
                        name='lastName'/>
                </Box>
                <Box marginBottom={3}>
                    <TextField
                        error={!!errorMessages.phone} helperText={errorMessages.phone} value={values.phone}
                        onChange={handleInputChange} fullWidth label='PhoneNumber' name='phone'/>
                </Box>

                <Button variant='contained' type='submit'>Sign Up</Button>
            </form>

            <Box marginTop={1} marginBottom={1}>
                <Link sx={{cursor: 'pointer'}} role='button' variant='body2' onClick={handleChangeFormTypeClick(USER_ENTRY_FORM_TYPE.Login)}>Already Have An Account</Link>
            </Box>
        </Box>
    );
};

export default SignUpForm;