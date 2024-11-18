import React, { useEffect, useState } from 'react';
import Header from '../organism/Header';
import Loader from '../atoms/Loader';
import './css/MyStories.css';

const MyStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No estás autenticado. Por favor inicia sesión.');
      setLoading(false);
      return;
    }

    fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/stories', {
      method: 'GET',
      headers: {
        auth: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStories(data.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-stories-page">
      <Header title="Mis historias" />
      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <h2>.</h2>
          
          {stories.length > 0 ? (
            <div className="story-container">
              {stories.map((story) => (
                <div className="story-item" key={story._id}>
                  <h3>{story.name}</h3>
                  <p>{story.description || 'Sin descripción'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay historias disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyStories;
