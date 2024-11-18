import React from 'react';
import Header from '../atoms/Header';
import './css/Layout.css';

const Layout = ({ children, title, onMenuClick }) => {
  return (
    <div className="layout">
      <Header title={title} onMenuClick={onMenuClick} />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
