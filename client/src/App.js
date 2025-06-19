import React, { useState, useEffect } from 'react';

function App() {
  const [bobaShops, setBobaShops] = useState([]);

  useEffect(() => {
    async function getBobaShops() {
      try {
        const response = await fetch('http://localhost:3001/api/v1/boba?location=los-gatos');
        const data = await response.json();
        setBobaShops(data.businesses || []);
      } catch (error) {
        console.error('Failed to get boba shops:', error);
      }
    }

    getBobaShops();
  }, []);

  return (
    <div>
      <h1>Boba Shops Near Los Gatos</h1>
      <ul>
        {bobaShops.map(shop => (
          <li key={shop.id}>{shop.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
