import React from 'react';
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import AccountMenu from "../../components/AccountMenu/AccountMenu";
import {Outlet} from "react-router-dom";

const Booking = () => {
    const {isLoggedIn} = useSelector(state => ({isLoggedIn: !!state.auth.jwt}))

    return (
        <Grid container spacing={2} sx={{padding: 3, marginTop: '60px'}}>
            {isLoggedIn && <Grid item xs={3}>
                <AccountMenu/>
            </Grid>}

            <Grid item xs>
                <Outlet />
            </Grid>
        </Grid>
        );
};

export default Booking;