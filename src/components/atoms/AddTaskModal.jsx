import React, { useState } from 'react'; 
import './css/AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, onAddTask, storyId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');
  const [done, setDone] = useState(false); // Estado para "done"
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(''); // Para el mensaje de éxito/error

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(''); // Resetear mensaje de notificación

    // Validaciones
    if (!name) {
      setNotification('El nombre es obligatorio.');
      setLoading(false);
      return;
    }
    if (description && description.length < 10) {
      setNotification('La descripción debe tener al menos 10 caracteres.');
      setLoading(false);
      return;
    }

    const taskData = {
      done, // Estado de la tarea
      name,
      description,
      story: storyId,
      created: new Date().toISOString(),
      due,
    };

    const token = localStorage.getItem('token');

    fetch("https://lamansysfaketaskmanagerapi.onrender.com/api/tasks", {
      method: 'POST',
      headers: {
        'auth': token, // Autenticación
        'Content-Type': 'application/json', // Cabecera de tipo JSON
      },
      body: JSON.stringify(taskData), // Cuerpo de la petición
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from server:', data); // Mostrar la respuesta completa en la consola
        
        // Verificación del campo "status"
        if (data.status !== 'success') {
          throw new Error(data.message || 'Error al agregar la tarea.'); // Lanzar error si no es exitoso
        }

        onAddTask(data.data); // Agregar la nueva tarea a la lista
        setNotification('¡Tarea creada exitosamente!'); // Mensaje de éxito
        setTimeout(() => {
          onClose(); // Cerrar el modal después de un breve período
          setNotification(''); // Limpiar el mensaje de notificación
        }, 1500); // 1.5 segundos de retraso antes de cerrar
      })
      .catch((error) => {
        console.error('Error details:', error); // Mostrar detalles del error en la consola
        setNotification(`Error del servidor: ${error.message || 'Error desconocido al agregar la tarea.'}`); // Mostrar el error real
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Agregar Tarea</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength={10}
              />
            </div>
            <div>
              <label>Fecha de Vencimiento</label>
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
            <div>
              <label>Estado de la tarea</label>
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
              />
              <span>{done ? 'Completada' : 'Incompleta'}</span>
            </div>
            {notification && <p style={{ color: notification.includes('exitosamente') ? 'green' : 'red' }}>{notification}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Agregar'}
            </button>
            <button type="button" onClick={onClose}>Cerrar</button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddTaskModal;
