import React, { useState } from 'react';
import './css/SettingsPage.css';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Aquí puedes guardar esta configuración en el backend o en localStorage.
  };

  const handleUpdateSettings = () => {
    // Aquí puedes llamar a una API para actualizar las configuraciones del usuario.
    console.log('Settings updated:', { username, password, notificationsEnabled });
    alert('Configuraciones actualizadas correctamente');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="settings-page">
      <h2>.</h2>
      <h2>Configuraciones</h2>
      
      <div className="settings-section">
        <label htmlFor="username">Nombre de Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Nuevo nombre de usuario"
        />
      </div>

      <div className="settings-section">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Nueva contraseña"
        />
      </div>

      <div className="settings-section">
        <label htmlFor="notifications">Notificaciones:</label>
        <button onClick={handleToggleNotifications}>
          {notificationsEnabled ? 'Desactivar' : 'Activar'} Notificaciones
        </button>
      </div>

      <div className="settings-actions">
        <button onClick={handleUpdateSettings} className="save-btn">Guardar Cambios</button>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default SettingsPage;
