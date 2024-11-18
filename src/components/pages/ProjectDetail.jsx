import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/ProjectDetail.css';
import Header from '../organism/Header';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [epics, setEpics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });
       

        if (!response.ok) {
          throw new Error('Error al obtener el proyecto');
        }

        const data = await response.json();
        setProject(data.data);

        const epicsResponse = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}/epics`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });

        if (!epicsResponse.ok) {
          throw new Error('Error al obtener las épicas');
        }

        const epicsData = await epicsResponse.json();
        setEpics(epicsData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <p>Cargando detalles del proyecto y épicas...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!project) {
    return <p>No se encontraron detalles del proyecto.</p>;
  }

  return (
    <div className="project-detail-container">
    <Header title={project.name} />
    <h1>.</h1>
      <p className="project-detail-description">{project.description}</p>

      <h2>Épicas del Proyecto</h2>
      <div className="epic-list">
        {epics.length > 0 ? (
          epics.map((epic) => (
            <Link to={`/my-projects/${projectId}/epics/${epic._id}`} key={epic._id} className="epic-item">
              <span className="epic-icon">{epic.icon}</span>
              <h4>{epic.name}</h4>
              <p>{epic.description}</p>
            </Link>
          ))
        ) : (
          <p>No hay épicas en este proyecto.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
