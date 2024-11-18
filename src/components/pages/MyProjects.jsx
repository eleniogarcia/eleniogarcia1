// src/components/pages/MyProjects.jsx
import React, { useState, useEffect } from 'react';
import Header from '../organism/Header';
import ProjectList from '../molecules/ProjectList';
import Loader from '../atoms/Loader';
import './css/MyProjects.css';
import { useNavigate } from 'react-router-dom';


const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Asegúrate de definir el navigate hook aquí
 const navigate = useNavigate(); // Este hook permite navegar entre rutas

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token'); // Recupera el token del localStorage
      console.log('Token para fetch:', token); // Log para depuración

      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/projects', {
          method: 'GET',
          headers: {
            'auth': token, // Envía el token en el header
            'Content-Type': 'application/json',
          },
        });


        const data = await response.json();
        setProjects(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);


  // Definir la función antes de utilizarla
  const handleProjectClick = (projectId) => {
    navigate(`/my-projects/${projectId}`); // Navega a la página de detalles del proyecto
  };
  

  return (
    
      <div className="my-projects-page">
        <Header title="My Projects" />
        <h1>.</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <ProjectList projects={projects} onClickProject={handleProjectClick} />
        )}
        
      </div>
   
  );
};

export default MyProjects;
