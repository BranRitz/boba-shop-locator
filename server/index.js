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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
