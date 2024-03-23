import React, { useState, useEffect } from 'react';

const App = () => {
  const [catData, setCatData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bannedAttributes, setBannedAttributes] = useState([]);

  const fetchCatData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search', {
        method: 'GET',
        headers: {
          'x-api-key': 'live_eDyGAcQuKePh8O7QJpVjqQ8r2Hu45skXRbhjqepY6V5LIiqlLn4dvzvFCe9gHMQK'
        }
      });
      const jsonData = await response.json();
      if (jsonData.length > 0) {
        setCatData(jsonData[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchClick = () => {
    fetchCatData();
  };

  const handleBanAttribute = (attribute) => {
    setBannedAttributes([...bannedAttributes, attribute]);
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <div>
      <h1>Cat Images</h1>
      <button onClick={handleFetchClick} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Cat Image'}
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : catData ? (
        <div>
          <img src={catData.url} alt="Cat" style={{ maxWidth: '100%' }} />
          <p>Attributes:</p>
          <ul>
            {Object.entries(catData).map(([key, value]) => {
              if (typeof value === 'string' && key !== 'url') {
                return (
                  <li key={key} onClick={() => handleBanAttribute(key)}>
                    {key}: {value}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      ) : (
        <p>No cat image available.</p>
      )}
    </div>
  );
};

export default App;
