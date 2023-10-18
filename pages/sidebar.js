import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Profile from '@mui/icons-material/PersonOutline';

export default function TemporaryDrawer(props) {
  const { isDrawerOpen, toggleDrawer } = props;
  return (
    <div>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}
      >
        {/*<button onClick={toggleDrawer}>Toggle Drawer</button>*/}
      </Box>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 250 }}>
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Profile /> {/* Use the AccountCircle icon */}
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
          <Divider />
          <List>
            {['Dashboard', 'Users', 'Create Quotes','Send Notification','Customer Analysis'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}