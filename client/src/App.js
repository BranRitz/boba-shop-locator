import React, { useState, useEffect } from 'react';

const locationNames = {
  'los-gatos': 'Los Gatos',
  'new-york': 'New York',
  'la': 'Los Angeles',
};

const sortOptions = {
  distance: 'Sort by Distance',
  rating: 'Sort by Rating',
};

async function getBobaShops(location, sortBy) {
  const response = await fetch(`http://localhost:3001/api/v1/boba?location=${location}&sort_by=${sortBy}`);
  const data = await response.json();
  return data.businesses || [];
}

function App() {
  const [bobaShops, setBobaShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('los-gatos');
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    setLoading(true);
    getBobaShops(location, sortBy)
      .then(setBobaShops)
      .catch(err => console.error('Failed to get boba shops:', err))
      .finally(() => setLoading(false));
  }, [location, sortBy]);

  return (
    <div>
      <select value={location} onChange={e => setLocation(e.target.value)}>
        {Object.entries(locationNames).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          {Object.entries(sortOptions).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

      <h1>Boba Shops Near Netflix's {locationNames[location]} Office</h1>

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
