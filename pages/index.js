import Header from './header';
import Sidebar from './sidebar';
import Table from './ManageUsers';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Styles from '../styles/Home.module.css';
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
    <main className={Styles.customBox}>
       <ThemeProvider theme={darkTheme}> 
       <Header toggleDrawer={toggleSidebar} />
      <Sidebar isDrawerOpen={isSidebarOpen} toggleDrawer={toggleSidebar} />
      <Table/>
      </ThemeProvider>
     
    </main>
  );
}


