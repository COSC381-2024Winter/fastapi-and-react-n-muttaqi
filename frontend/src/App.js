import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './App.css'; 

function App() {
  const [movieId, setMovieId] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleMovieIdChange = (event) => {
    setMovieId(event.target.value);
  };

  useEffect(() => {
    console.log(movieId);
    if (movieId.trim() !== '') {
      fetch(`http://localhost:8000/movies/${movieId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Movie not found');
          }
          return response.json();
        })
        .then(data => {
          setMovieDetails(data);
          //console.log(data)
          setError(null);
        })
        .catch(error => {
          setMovieDetails(null);
          setError('Movie not found');
        });
    } else {
      setMovieDetails(null);
      setError(null);
    }
  }, [movieId]);

  return (
    <div className="App">
      <div className="TextField-container">
        <TextField
          id="movieId"
          label="Enter Movie ID"
          value={movieId}
          onChange={handleMovieIdChange}
          className="TextField"
        />
      </div>
    </div>
  );
}

export default App;


