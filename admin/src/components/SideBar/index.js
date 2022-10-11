import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const mainMenus = [
  {
    text: 'Booking',
    url: '/admin/booking'
  },
  {
    text: 'History',
    url: '/admin/history'
  },
  {
    text: 'Occasions',
    url: '/admin/occasions'
  },
  {
    text: 'Vehicles',
    url: '/admin/vehicles'
  },
];

const userMenus = [
  {
    text: 'Users',
    url: '/admin/users'
  },
  {
    text: 'Account',
    url: '/admin/account'
  }
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {mainMenus.map(({text, url}, index) => (
            <Link to={url} key={index}>
              <ListItem button>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {userMenus.map(({text, url}, index) => (
            <Link to={url} key={index}>
              <ListItem button>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <ListItem button>
          <ListItemText primary="Log out" />
        </ListItem>
      </Box>
    </Drawer>
  );
}

export default Sidebar;