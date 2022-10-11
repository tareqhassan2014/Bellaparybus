import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { blueGrey } from '@mui/material/colors';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/images/logo_white.png';
import theme from '../../utils/theme';
import UserEntry from '../UserEntry/UserEntry';

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            width: '100%',
            top: 0,
            left: 0,
            padding: theme.spacing(1),
            position: 'fixed',
            zIndex: 999,
            background: 'white',
            boxShadow: '0 0 15px grey',
        },
        logo: {
            width: 70,
            cursor: 'pointer',
        },
    })
);

const LinkItem = styled(Link)(({ theme }) => ({
    ...theme.typography.body2,
    display: 'flex',
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
        background: blueGrey[100],
        borderRadius: 9999,
    },
}));

const headersData = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Book Online',
        href: '/booking',
    },
    {
        label: 'Contact Us',
        href: '/contact',
    },
];

function Header() {
    const classes = useStyles();
    const { isLoggedIn } = useSelector((state) => ({
        isLoggedIn: !!state.auth.jwt,
    }));
    const [state, setState] = useState({
        drawerOpen: false,
    });

    const handleDrawerOpen = () => {
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
    };

    const handleDrawerClose = () => {
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={handleDrawerClose}
        >
            <List>
                {headersData.map(({ label, href }, index) => (
                    <ListItem button key={index}>
                        <Link to={href}>
                            <ListItemText primary={label} />
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {!isLoggedIn && (
                <>
                    <List>
                        <ListItem button>
                            <Link to="/login">
                                <ListItemText primary="Log In" />
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/signup">
                                <ListItemText primary="Sign Up" />
                            </Link>
                        </ListItem>
                    </List>
                </>
            )}
        </Box>
    );

    const { drawerOpen } = state;

    return (
        <div className={classes.header}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent="space-between">
                        <Grid item xs="auto">
                            <Link to="/">
                                <img
                                    src={LogoImg}
                                    className={classes.logo}
                                    alt="Logo"
                                />
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs="auto"
                            alignSelf="center"
                            display={{ xs: 'none', md: 'block' }}
                        >
                            <Grid
                                container
                                justifyContent="flex-end"
                                spacing={1}
                            >
                                <Grid item xs="auto">
                                    <LinkItem to="/">Home</LinkItem>
                                </Grid>
                                <Grid item xs="auto">
                                    <LinkItem to="/booking/reservation">
                                        Book Online
                                    </LinkItem>
                                </Grid>
                                <Grid item xs="auto">
                                    <LinkItem to="/contact">
                                        Contact Us
                                    </LinkItem>
                                </Grid>
                                {!isLoggedIn ? (
                                    <UserEntry />
                                ) : (
                                    <Grid item xs="auto">
                                        <Button variant="contained">
                                            Log out
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs="auto"
                            alignSelf="center"
                            display={{ xs: 'block', md: 'none' }}
                        >
                            <MenuIcon
                                onClick={handleDrawerOpen}
                                style={{ display: 'flex', cursor: 'pointer' }}
                            />
                            <Drawer
                                {...{
                                    anchor: 'right',
                                    open: drawerOpen,
                                    onClose: handleDrawerClose,
                                }}
                            >
                                {list()}
                            </Drawer>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default Header;
