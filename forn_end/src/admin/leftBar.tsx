import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        flexShrink: 0,
        backgroundColor: '#03a9f4',
        color: 'white',
        height: '100vh',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">PHAN</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="List Products" />
        </ListItem>
        <ListItem button component={Link} to="/admin/checkout">
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="CheckOut" />
        </ListItem>
        <ListItem button component={Link} to="/admin/integrations">
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItem>
        <ListItem button component={Link} to="/admin/settings">
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/admin/account">
          <ListItemIcon>
            <AccountIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem button component={Link} to="/admin/error">
          <ListItemIcon>
            <ErrorIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Error" />
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">Need more features?</Typography>
        <Typography variant="body2">Check out our Pro solution template.</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
