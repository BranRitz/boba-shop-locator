console.log('Starting server');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());

const {
    NETFLIX_LOCATIONS,
    RADIUS,
    LIMIT,
    VALID_SORTS,
    YELP_SEARCH_URL,
} = require('./constants');

app.get('/', (req, res) => {  // Test route
    res.send('Hello from the server :-)');
});

app.get('/api/v1/boba', async (req, res) => {
    const { location, sort_by = 'distance', page = 1 } = req.query;
    if (!VALID_SORTS.includes(sort_by))
        return res.status(400).json({ error: `Invalid sort_by input: ${sort_by}` });

    const address = NETFLIX_LOCATIONS[location];
    if (!address) return res.status(400).json({ error: `Invalid location input: ${location}.` });

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
        if (err.response) {
            // Received response with error from Yelp
            return res.status(err.response.status).json({
                error: err.response.data.error?.description || 'Yelp API returned error.',
            });
        } else if (err.request) {
            // Did not receive a response from Yelp at all 
            return res.status(502).json({
                error: "Did not receive response from Yelp."
            });
        } else return res.status(500).json({ error: 'Failed to fetch data from Yelp.' });
    }
});
module.exports = app;