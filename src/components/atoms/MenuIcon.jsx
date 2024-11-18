import React from 'react';
import './css/MenuIcon.css';

const MenuIcon = ({ toggleSidebar }) => {
  return (
    <button className="menu-icon" onClick={toggleSidebar}>
      ☰
    </button>
  );
};

export default MenuIcon;
