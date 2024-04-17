import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './App.css'; // Import your CSS file


function App() {
 const [movieId, setMovieId] = useState('');
 const [movieDetails, setMovieDetails] = useState(null);
 const [error, setError] = useState(null);


 const handleMovieIdChange = (event) => {
   setMovieId(event.target.value);
 };


 useEffect(() => {
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
     {error && <p>{error}</p>}
     {movieDetails && (
       <div className="movie-details">
         <h2>Movie Details</h2>
         <p><strong>Name:</strong> {movieDetails.name}</p>
         <p><strong>Cast:</strong> {movieDetails.cast.join(', ')}</p>
       </div>
     )}
   </div>
 );
}


export default App;