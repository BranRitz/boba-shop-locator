import React, { useState, useEffect } from 'react';
import './App.css';

const locationNames = {
  'los-gatos': 'Los Gatos',
  'new-york': 'New York',
  'la': 'Los Angeles',
};

const sortOptions = {
  distance: 'Sort by Distance',
  rating: 'Sort by Rating',
};

async function getBobaShops(location, sortBy, page = 1) {
  const response = await fetch(`http://localhost:3001/api/v1/boba?location=${location}&sort_by=${sortBy}&page=${page}`);
  const data = await response.json();
  return data.businesses || [];
}

function metersToMiles(meters) {
  return (meters / 1609).toFixed(2);
}

function App() {
  const [bobaShops, setBobaShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('los-gatos');
  const [sortBy, setSortBy] = useState('distance');
  const [page, setPage] = useState(1);
  const [moreAvailable, setMoreAvailable] = useState(true);

  useEffect(() => {
    setPage(1);
    setBobaShops([]);
    setMoreAvailable(true);
    loadShops(1, true);
  }, [location, sortBy]);

  const loadShops = async (pageToLoad, isNewSearch = false) => {
    setLoading(true);
    try {
      const newShops = await getBobaShops(location, sortBy, pageToLoad);
      setBobaShops(prev => isNewSearch ? newShops : [...prev, ...newShops]);
      if (newShops.length < 20) setMoreAvailable(false);
    } catch (err) {
      console.error('Failed to get boba shops:', err);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadShops(nextPage);
  };

  return (
    <div className="container">
      <h1>Boba Shops Near Netflix's {locationNames[location]} Office</h1>
      <div className="dropdowns">
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
      </div>

      {loading && page === 1 ? (
        <p><i>Loading boba shops</i></p>
      ) : (
        <ul>
          {bobaShops.map(shop => (
            <li key={shop.id}>
              <strong>{shop.name}</strong><br />
              Rating: {shop.rating} ⭐<br />
              Distance: {metersToMiles(shop.distance)} miles
            </li>
          ))}
        </ul>
      )}

      {moreAvailable && !loading && (
        <button onClick={handleLoadMore}>Load More Boba Shops</button>
      )}

      {loading && page > 1 && <p><i>Loading more...</i></p>}
    </div>
  );
}

export default App;
