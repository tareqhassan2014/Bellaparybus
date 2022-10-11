import React, {useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {login} from "../../services/authServices";
import {useDispatch} from "react-redux";
import {SET_JWT} from "../../store/actionTypes";
import {
    isHasErrorByErrorObj,
    mapValueToErrorMessage,
    validateEmail,
    validateRequired
} from "../../helpers/validateHelper";
import {Link, Typography} from "@mui/material";
import {USER_ENTRY_FORM_TYPE} from "../../common/constant";

const loginValueValidators = {
    email: [validateRequired(), validateEmail()],
    password: [validateRequired()]
}

const LoginForm = ({onLogin, onChangeFormType}) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const validateForm = () => {
        const newErrorMessages = mapValueToErrorMessage(values,loginValueValidators);
        setErrorMessages(newErrorMessages);

        return !isHasErrorByErrorObj(newErrorMessages);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const data = await login(values);
            if (data?.user?.token) {
                dispatch({
                    type: SET_JWT,
                    payload: data?.user?.token
                })
            }
            if (onLogin) {
                onLogin();
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleChangeFormTypeClick = (formType) => () => {
        onChangeFormType(formType);
    }

    return (
        <Box padding={3} minWidth='500px' textAlign='center'>
            <Typography marginBottom={3} variant='h4'>Log In</Typography>
            <form onSubmit={handleSubmit}>
                <Box marginBottom={3}>
                    <TextField onChange={handleInputChange} error={!!errorMessages.email} helperText={errorMessages.email} value={values.email} fullWidth label='Email' name='email'/>
                </Box>
                <Box marginBottom={3}>
                    <TextField onChange={handleInputChange} error={!!errorMessages.password} helperText={errorMessages.password} value={values.password} fullWidth label='Password' type='password' name='password'/>
                </Box>
                <Button variant='contained' type='submit'>Login</Button>
            </form>
            <Box marginTop={1} marginBottom={1}>
                <Link sx={{cursor: 'pointer'}} role='button' variant='body2' onClick={handleChangeFormTypeClick(USER_ENTRY_FORM_TYPE.ForgotPassword)}>Forgot Password?</Link>
            </Box>
            <Box marginTop={1} marginBottom={1}>
                <Link sx={{cursor: 'pointer'}} role='button' variant='body2' onClick={handleChangeFormTypeClick(USER_ENTRY_FORM_TYPE.SignUp)}>Create New Account</Link>
            </Box>
        </Box>
    );
};

export default LoginForm;