const axios = require('axios');
const {
    NETFLIX_LOCATIONS,
    RADIUS,
    LIMIT,
    YELP_SEARCH_URL
} = require('../constants');

async function getBobaShops({ location, sort_by = 'distance', page = 1 }) {
    const address = NETFLIX_LOCATIONS[location];
    if (!address) {
        const error = new Error(`Invalid location input: ${location}.`);
        error.status = 400;
        throw error;
    }

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
        return response.data;
    } catch (err) {
        if (err.response) {
            // Received response with error from Yelp
            const error = new Error(err.response.data.error?.description || 'Yelp API returned error.');
            error.status = err.response.status;
            throw error;
        } else if (err.request) {
            // Did not receive a response from Yelp at all 
            const error = new Error('Did not receive response from Yelp.');
            error.status = 502;
            throw error;
        } else {
            const error = new Error('Failed to fetch data from Yelp.');
            error.status = 500;
            throw error;
        }
    }
}

module.exports = { getBobaShops };