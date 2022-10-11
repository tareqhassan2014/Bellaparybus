import * as React from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

export default function Main() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <SideBar />
      <Outlet />
    </Box>
  );
}