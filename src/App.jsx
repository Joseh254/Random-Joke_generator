import React, { useState, useEffect } from 'react';

function App() {
  const [joke, setJoke] = useState('');
  const [delivery, setDelivery] = useState('');
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.delivery);
      
      if (data.setup) {
        setJoke(data.setup);
        setDelivery(data.delivery);
      } else {
        setJoke(data.joke); 
        setDelivery(''); // Clear delivery if it's a single-part joke
      }
    } catch (error) {
      console.error('Error fetching the data:', error);
      setError('Failed to fetch joke. Please try again later.');
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <h1>Random Joke</h1>
      {error && <p>{error}</p>}
      {!error && (
        <>
          <p>{joke}</p>
          {delivery && <p>{delivery}</p>}
          <button onClick={fetchJoke}>Get New Joke</button>
        </>
      )}
    </div>
  );
}

export default App;
