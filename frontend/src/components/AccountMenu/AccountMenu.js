import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LogoutIcon from '@mui/icons-material/Logout';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {useLocation, useNavigate} from 'react-router-dom';

const items = [
    {
        Icon: DirectionsCarIcon,
        text: 'Book A Ride',
        navigatePath: '/booking/reservation'
    }, {
        Icon: AccessTimeIcon,
        text: 'Upcoming Ride',
        navigatePath: '/booking/upcoming-ride'
    }, {
        Icon: EventAvailableIcon,
        text: 'Past Ride',
        navigatePath: '/booking/past-ride'
    }, {
        Icon: BookOnlineIcon,
        text: 'Quote Requests',
        navigatePath: '/booking/quote-requests'
    }, {
        Icon: CreditCardIcon,
        text: 'Payment Methods',
        navigatePath: '/booking/payment-methods'
    }, {
        Icon: PersonIcon,
        text: 'My Account',
        navigatePath: '/booking/my-account'
    }, {
        Icon: LogoutIcon,
        text: 'Logout',
        navigatePath: '/booking/blank'
    }
]

const AccountMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToPath = (navigatePath) => () => {
        navigate(navigatePath)
    }

    return (
        <List>
            {items.map(({Icon, text, navigatePath}) => (
                <ListItem>
                    <ListItemButton onClick={navigateToPath(navigatePath)} selected={location.pathname === navigatePath}>
                        <ListItemIcon><Icon/></ListItemIcon>
                        <ListItemText>{text}</ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default AccountMenu;