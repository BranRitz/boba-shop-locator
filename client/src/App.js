import React, { useState, useEffect } from 'react';

const locationNames = {
  'los-gatos': 'Los Gatos',
  'new-york': 'New York',
  'la': 'Los Angeles',
};

async function getBobaShops(location) {
  const response = await fetch(`http://localhost:3001/api/v1/boba?location=${location}`);
  const data = await response.json();
  return data.businesses || [];
}

function App() {
  const [bobaShops, setBobaShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('los-gatos');

  useEffect(() => {
    setLoading(true);
    getBobaShops(location)
      .then(setBobaShops)
      .catch(err => console.error('Failed to get boba shops:', err))
      .finally(() => setLoading(false));
  }, [location]);

  return (
    <div>
      <select value={location} onChange={e => setLocation(e.target.value)}>
        {Object.entries(locationNames).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <h1>Boba Shops Near {locationNames[location]}</h1>

      {loading ? (
        <p><i>Loading boba shops</i></p>
      ) : (
        <ul>
          {bobaShops.map(shop => (
            <li key={shop.id}>{shop.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
