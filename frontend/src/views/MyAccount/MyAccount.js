import React from 'react';
import MyAccountLoginInfo from "../../components/MyAccount/MyAccountLoginInfo";
import MyAccountUserProfile from "../../components/MyAccount/MyAccountUserProfile";
import Box from "@mui/material/Box";
import MyAccountSavedLocations from "../../components/MyAccount/MyAccountSavedLocations";

const MyAccount = () => {
    return (
        <div>
            <Box marginBottom={2}>
                <MyAccountLoginInfo />
            </Box>

            <Box marginBottom={2}>
                <MyAccountUserProfile />
            </Box>
            <Box>
                <MyAccountSavedLocations />
            </Box>
        </div>

    );
};

export default MyAccount;