import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children, setTitle, projectName }) => {
  const location = useLocation();

  useEffect(() => {
    // Lógica para actualizar el título según la ruta
    let title;
    switch (location.pathname) {
      case '/home':
        title = "HOME";
        break;
      case '/login':
        title = "Iniciar Sesión - Gestor de Tareas";
        break;
      case '/my-projects':
        title = "MY PROJECTS";
        break;
      case '/my-stories':
        title = "Mis Historias - Gestor de Tareas";
        break;
      case '/':
        title = "Inicio - Gestor de Tareas";
        break;
      case '/settings':
        title = "Configuracion - Gestor de Tareas";
        break;
      default:
        if (location.pathname.includes('/my-projects/')) {
          title = projectName || "Detalle de Proyecto - Gestor de Tareas"; // Uso del nombre del proyecto
        } else {
          title = "Gestor de Tareas";
        }
        break;
    }

    setTitle(title);
    document.title = title;
  }, [location, setTitle, projectName]); // Agregar projectName como dependencia

  return <>{children}</>;
};

export default PageWrapper;
