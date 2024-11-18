import React from 'react';
import './css/Sidebar.css';

// Componente que renderiza el menú lateral. Se muestra u oculta según el estado.
const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={closeSidebar}>‹</button>
      <div className="sidebar-content">
        <img src="logo.png" alt="App Logo" className="app-logo" />
        <nav>
          <ul>
            <li><a href="/home">Inicio</a></li>
            <li><a href="/my-projects">Proyectos</a></li>
            <li><a href="/my-stories">Historias</a></li>
            <li><a href="/settings">Configuración</a></li>
          </ul>
        </nav>
        <div className="user-profile">
          <p>Perfil del Usuario</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
