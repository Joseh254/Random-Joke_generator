import React, { useState, useEffect } from 'react';

function App() {
  const [joke, setJoke] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJoke = async () => {
      const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.setup) {
          setJoke(data.setup);
        } else {
          setJoke(data.joke); // For single-part jokes
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
        setError('Failed to fetch joke. Please try again later.');
      }
    };

    fetchJoke();
  }, []);

  return (
    <div>
      <h1>Random Joke</h1>
      {error && <p>{error}</p>}
      {!error && <p>{joke}</p>}
    </div>
  );
}

export default App;
