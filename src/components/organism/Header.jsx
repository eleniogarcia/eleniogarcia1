import React, { useState } from 'react';
import MenuIcon from '../atoms/MenuIcon';
import Sidebar from '../molecules/Sidebar';
import './css/Header.css';

const Header = ({ title }) => { // Cambia aquí para recibir title
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <header className="app-header">
      <MenuIcon toggleSidebar={toggleSidebar} />
      <h1 className="header-title">{title}</h1>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </header>
  );
};

export default Header;
