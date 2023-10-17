import Header from './header';
import Sidebar from './sidebar';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleDrawer={toggleSidebar} />
      <Sidebar isDrawerOpen={isSidebarOpen} toggleDrawer={toggleSidebar} />
    </>
  );
}