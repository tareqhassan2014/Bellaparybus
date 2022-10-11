import React, {useState} from 'react';
import MyAccountInfoWrapper from "./MyAccountInfoWrapper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import MyAccountUserProfileDialog from "./MyAccountUserProfileDialog";

const MyAccountUserProfile = () => {
    const {userProfile} = useSelector((state) => ({
        userProfile: state.accountInfo.userProfile
    }))

    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const handleDialogClose = () => {
        setIsOpenDialog(false)
    }

    const handleEditProfileClick = () => {
        setIsOpenDialog(true);
    }

    return (
        <MyAccountInfoWrapper title = 'User Profile' actionButton={<Button variant='contained' onClick={handleEditProfileClick}>Edit Profile</Button>}>
            <MyAccountUserProfileDialog isOpen={isOpenDialog} onClose={handleDialogClose}/>
            <Grid container rowSpacing={2}>
                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    First Name:
                </Grid>
                <Grid item xs={6} sm={9}>
                    {userProfile.firstName}
                </Grid>

                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    Last Name:
                </Grid>
                <Grid item xs={6} sm={9}>
                    {userProfile.lastName}
                </Grid>
                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    Company:
                </Grid>
                <Grid item xs={6} sm={9} >
                    {userProfile.company}
                </Grid>

                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    Phone (mobile):
                </Grid>
                <Grid item xs={6} sm={9}>
                    {userProfile.phoneMobile}
                </Grid>
                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    Phone (work):
                </Grid>
                <Grid item xs={6} sm={9}>
                    {userProfile.phoneWork}
                </Grid>
                <Grid item xs={6} sm={3} sx={{fontWeight: 'bold'}}>
                    Phone (home):
                </Grid>
                <Grid item xs={6} sm={9}>
                    {userProfile.phoneHome}

                </Grid>
            </Grid>
        </MyAccountInfoWrapper>
    );
};

export default MyAccountUserProfile;