import Header from './header';
import Sidebar from './sidebar';
import Table from './ManageUsers';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
       <ThemeProvider theme={darkTheme}> 
       <Header toggleDrawer={toggleSidebar} />
      <Sidebar isDrawerOpen={isSidebarOpen} toggleDrawer={toggleSidebar} />
      <Table/>
      </ThemeProvider>
     
    </>
  );
}
