import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoginForm from "./LoginForm";
import Grid from "@mui/material/Grid";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";
import {USER_ENTRY_FORM_TYPE} from "../../common/constant";

const UserEntry = () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [formType, setFormType] = useState(USER_ENTRY_FORM_TYPE.Login);

    const handleCloseDialog = () => {
        setIsOpenDialog(false)
    }

    const handleLoginClick = () => {
        setFormType(USER_ENTRY_FORM_TYPE.Login);
        setIsOpenDialog(true);
    }

    const handleSignUpClick = () => {
        setFormType(USER_ENTRY_FORM_TYPE.SignUp);
        setIsOpenDialog(true);
    }

    const handleChangeFormType = (formType) => {
        setFormType(formType)
    }

    const renderForm = () => {
        switch (formType) {
            case USER_ENTRY_FORM_TYPE.Login:
                return <LoginForm onLogin={handleCloseDialog} onChangeFormType={handleChangeFormType}/>;
            case USER_ENTRY_FORM_TYPE.SignUp:
                return <SignUpForm onSignUp={handleCloseDialog} onChangeFormType={handleChangeFormType}/>;

            default:
                return <ForgotPassword onSubmit={handleCloseDialog}/>
        }
    }

    return (
        <>
            <Grid item xs="auto">
                <Button variant="text" onClick={handleLoginClick}>Log in</Button>
            </Grid>
            <Grid item xs="auto">
                <Button variant="contained" onClick={handleSignUpClick}>Sign up</Button>
            </Grid>
            <Dialog
                open={isOpenDialog}
                onClose={handleCloseDialog}
            >
                {renderForm()}
            </Dialog>
        </>
    );
};

export default UserEntry;