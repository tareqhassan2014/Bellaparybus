import React from 'react';
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { blueGrey } from '@mui/material/colors';
import LogoImg from '../../assets/images/logo_white.png';
import theme from "../../utils/theme";

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      width: '100%',
      background: blueGrey[900],
      padding: theme.spacing(6, 0),
      marginTop: 'auto'
    },
    logo: {
      width: 100,
      cursor: 'pointer'
    }
  }),
);

const Item = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(0, 1),
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.primary,
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="space-between">
            <Grid item >
              <img src={LogoImg} className={classes.logo} alt="Logo" />
            </Grid>
            <Grid item>
              <Link to="/"><Item>Home</Item></Link>
              <Link to="/booking"><Item>Book Online</Item></Link>
              <Link to="/contact"><Item>Contact Us</Item></Link>
              <Link to="/conditions"><Item>Terms & Conditions</Item></Link>
              <Link to="/ReurnAndRefunds"><Item>Return & Refunds</Item></Link>
              <Link to="/PrivacyPolicy"><Item>Privacy Policy</Item></Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Footer;