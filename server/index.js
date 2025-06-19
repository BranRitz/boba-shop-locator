console.log('Starting server');

const express = require('express');
const axios = require('axios'); 
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from the server :-)');
});

const NETFLIX_LOCATIONS = {
  'los-gatos': '121 Albright Way, Los Gatos, CA',
  'new-york': '888 Broadway, New York, NY',
  'la': '5808 Sunset Blvd, Los Angeles, CA',
};
const RADIUS = 10000;  // meters
const LIMIT = 20;
const YELP_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';

app.get('/api/v1/boba', async (req, res) => {
  const { location, sort_by = 'distance', page = 1 } = req.query;
  const address = NETFLIX_LOCATIONS[location];

  try {
    const offset = (page - 1) * LIMIT;
    const response = await axios.get(YELP_SEARCH_URL, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: 'boba',
        location: address,
        radius: RADIUS,
        sort_by,
        limit: LIMIT,
        offset,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from Yelp' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
