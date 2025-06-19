console.log('Starting server');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const { getBobaShops } = require('./services/bobaLocatorService');
const { VALID_SORTS } = require('./constants');

app.get('/', (req, res) => {  // Test route
    res.send('Hello from the server :-)');
});

app.get('/api/v1/boba', async (req, res) => {
    const { location, sort_by = 'distance', page = 1 } = req.query;
    if (!VALID_SORTS.includes(sort_by))
        return res.status(400).json({ error: `Invalid sort_by input: ${sort_by}` });
    try {
        const bobaShops = await getBobaShops({ location, sort_by, page });
        res.json(bobaShops);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
});

module.exports = app;