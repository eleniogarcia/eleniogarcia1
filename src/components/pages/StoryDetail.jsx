import React, { useState, useEffect } from 'react';
import Header from '../organism/Header';
import Loader from '../atoms/Loader';
import AddTaskModal from '../atoms/AddTaskModal';
import './css/StoryDetail.css';
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
  const { projectId, epicId, storyId } = useParams(); // Extraer los IDs de la URL
  const [story, setStory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la historia');
        }

        const storyData = await response.json();
        setStory(storyData.data);

        const tasksResponse = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}/tasks`, {
          method: 'GET',
          headers: {
            'auth': token,
            'Content-Type': 'application/json',
          },
        });

        if (!tasksResponse.ok) {
          throw new Error('Error al obtener las tareas');
        }

        const tasksData = await tasksResponse.json();
        setTasks(tasksData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storyId]);

  // Función para agregar tareas
  const handleAddTask = async (newTaskData) => {
    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      const response = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}/tasks`, {
        method: 'POST',
        headers: {
          'auth': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTaskData, storyId }),
      });

      const result = await response.json();

      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, result.data]);
      } else {
        throw new Error(result.message || 'Error al agregar la tarea');
      }
    } catch (error) {
      setError('Error al agregar la tarea: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (confirmDelete) {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'auth': token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la tarea');
        }

        setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId)); // Filtra las tareas eliminadas
      } catch (error) {
        setError('Error al eliminar la tarea: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="story-details-page">
      <Header title={story ? story.name : 'Detalles de la Historia'} />
      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {story ? (
            <div>
              <h1>.</h1>
              <h2>{story.description}</h2>
             
              <button onClick={() => setAddTaskModalOpen(true)}>Agregar Tarea</button>
              <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setAddTaskModalOpen(false)}
                onAddTask={handleAddTask} // Usa la nueva función para agregar la tarea
                storyId={storyId} // Pasa el ID de la story al modal
              />
              <h3>Tareas:</h3>
              {tasks.length > 0 ? (
                <ul>
                  {tasks.map((task) => (
                    <li key={task._id} className="task-item">
                      <h4>{task.name}</h4>
                      <p>{task.description || 'Sin descripción'}</p>
                      <p>Fecha de Vencimiento: {new Date(task.dueDate).toLocaleDateString()}</p>
                      <p>Estado: {task.done ? 'Hecha' : 'No hecha'}</p>
                      <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay tareas disponibles para esta historia.</p>
              )}
            </div>
          ) : (
            <p>No se encontró la historia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryDetail;
