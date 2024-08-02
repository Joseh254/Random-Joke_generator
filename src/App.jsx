import React, { useState, useEffect } from 'react';

function App() {
  const [joke, setJoke] = useState('');
  const [delivery, setDelivery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchJoke = async () => {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try {
      setLoading(true); 
      const response = await fetch(apiUrl);
      if (!response.ok) {
        setError('Network response was not ok');
        setLoading(false);
        return;
      }
      const data = await response.json();
      console.log(data.delivery);
      
      if (data.setup) {
        setJoke(data.setup);
        setDelivery(data.delivery);
      } else {
        setJoke(data.joke); 
        setDelivery(''); 
      }
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching the data:', error);
      setError('Failed to fetch joke. Please try again later.');
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);
if(loading){
  return <p>Loading...</p>
}
  return (
    <div>
      <h1>Random Joke</h1>
      {error && <p>{error}</p>}
      {!error && (
        <>
          <p>{joke}</p>
          {delivery && <p>{delivery}</p>}
          <button onClick={fetchJoke} disabled={loading}>
            {loading ? "Loading..." : "Get A New Joke"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
