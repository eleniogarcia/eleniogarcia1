import React, { useState } from 'react';
import Header from '../organism/Header'; // Asegúrate de que la ruta sea correcta
import './css/Home.css';

const Home = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(7); // Inicializamos con 7 intentos
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1); // Número aleatorio entre 1 y 100

  const handleGuess = () => {
    const numGuess = parseInt(guess);

    if (attemptsLeft > 1) {
      if (numGuess < 1 || numGuess > 100) {
        setMessage('Por favor, adivina un número entre 1 y 100.');
      } else if (numGuess === randomNumber) {
        setMessage('¡Correcto! ¡Bien hecho!');
      } else {
        setMessage(numGuess < randomNumber ? 'Demasiado bajo, intenta nuevamente.' : 'Demasiado alto, intenta nuevamente.');
        setAttemptsLeft(attemptsLeft - 1); // Resta un intento
      }
    } else {
      setMessage(`Te has quedado sin intentos. El número era ${randomNumber}.`);
      setAttemptsLeft(0); // Opcional: ya no permitirá más intentos
    }

    setGuess('');
  };

  return (
    <>
      <Header title="Home" /> {/* Aquí se pasa el título al Header */}
      <div className="home-page">
        <h1 className="game-title">---------------------------</h1>
        <h1 className="game-title">Adivina el Número</h1>
        <h1 className="inspirational-quote">
          "La mejor forma de predecir el futuro es crearlo."
        </h1>
        <div className="game-section">
          <h2>Adivina un número entre 1 y 100</h2>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Tu adivinanza"
            disabled={attemptsLeft === 0} // Desactiva el input cuando se acaben los intentos
          />
          <button onClick={handleGuess} disabled={attemptsLeft === 0}>
            Adivinar
          </button>
          {message && <p className="game-message">{message}</p>}
          <p>Intentos restantes: {attemptsLeft}</p>
        </div>
      </div>
    </>
  );
};

export default Home;
