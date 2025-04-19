const express = require('express');
const axios = require('axios');
const path = require('path'); // Import the path module
const cors = require('cors'); // Import cors package
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load environment variables from ../.env file

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

if (!OPENWEATHERMAP_API_KEY) {
    console.error('Error: OPENWEATHERMAP_API_KEY is not defined in the .env file.');
    process.exit(1); // Exit if the API key is missing
}

// Enable CORS for the frontend
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from the frontend
    methods: ['GET'],                 // Only allow GET requests
    credentials: true                 // Allow cookies to be sent with requests if needed
}));

// Middleware to handle JSON requests
app.use(express.json());

// Weather route
app.get('/weather/:zipcode', async (req, res) => {
    const { zipcode } = req.params;
    const countryCode = 'us'; // Defaulting to US as requested

    if (!zipcode) {
        return res.status(400).json({ error: 'Zipcode is required.' });
    }

    // Although the OpenWeatherMap docs mention using zip code directly for lat/lon,
    // their current API documentation (@https://openweathermap.org/current) emphasizes
    // using lat/lon or city name. The direct zip code lookup seems deprecated or less reliable.
    // The geocoding API is recommended for converting zip codes.
    // Let's use the geocoding API first to get lat/lon from the zip code.
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countryCode}&appid=${OPENWEATHERMAP_API_KEY}`;

    try {
        // 1. Get lat/lon from zip code using Geocoding API
        const geoResponse = await axios.get(geocodeUrl);

        if (!geoResponse.data || !geoResponse.data.lat || !geoResponse.data.lon) {
            // Check if the response contains zip and name but not lat/lon directly
            // This can happen if the zip is valid but maybe ambiguous or needs refinement
            if (geoResponse.data && geoResponse.data.zip && geoResponse.data.name) {
                 return res.status(404).json({ error: `Could not reliably determine coordinates for zipcode ${zipcode}. Received city: ${geoResponse.data.name}` });
            }
            console.error('Geocoding API did not return lat/lon:', geoResponse.data);
            return res.status(404).json({ error: `Could not find location for zipcode ${zipcode}` });
        }

        const { lat, lon } = geoResponse.data;

        // 2. Get weather data using lat/lon (requesting imperial units)
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=imperial`;
        const weatherResponse = await axios.get(weatherUrl);

        res.json(weatherResponse.data);

    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        if (error.response) {
            // Forward status code and error message from OpenWeatherMap if available
            res.status(error.response.status).json({ error: error.response.data.message || 'Failed to fetch weather data.' });
        } else {
            res.status(500).json({ error: 'An internal server error occurred.' });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}); 