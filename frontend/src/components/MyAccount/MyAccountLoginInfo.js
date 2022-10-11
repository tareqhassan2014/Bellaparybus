import React, {useState} from 'react';
import MyAccountInfoWrapper from "./MyAccountInfoWrapper";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import MyAccountLoginInfoDialog from "./MyAccountLoginInfoDialog";

const MyAccountLoginInfo = () => {
    const {loginInfo} = useSelector((state) => ({
        loginInfo: state.accountInfo.loginInfo
    }))

    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const handleDialogClose = () => {
        setIsOpenDialog(false)
    }

    const handleChangePasswordClicked = () => {
        setIsOpenDialog(true);
    }

    return (
        <MyAccountInfoWrapper title='Login Info' actionButton={<Button variant='contained' onClick={handleChangePasswordClicked}>Change Password</Button>}>
            <MyAccountLoginInfoDialog isOpen={isOpenDialog} onClose={handleDialogClose}/>
            <Grid container rowSpacing={2}>
                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    Login Email:
                </Grid>
                <Grid item xs={6} sm={9}>
                    {loginInfo.email}
                </Grid>

                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    Password
                </Grid>
                <Grid item xs={6} sm={9}>
                    ************
                </Grid>
            </Grid>
        </MyAccountInfoWrapper>
    );
};

export default MyAccountLoginInfo;