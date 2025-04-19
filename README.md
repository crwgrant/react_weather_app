# Weather Application

This project consists of a backend Express.js API server and a frontend React application that allows users to search for weather information by zip code.

## Project Structure

- `backend/` - Express.js server that provides weather data from OpenWeatherMap API
- `frontend/` - React application built with Vite and Tailwind CSS

## Prerequisites

1. Node.js (v14 or newer)
2. OpenWeatherMap API key (free tier available at [OpenWeatherMap](https://openweathermap.org/api))

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables:**
   Make sure your `.env` file in the root directory contains:
   ```
   OPENWEATHERMAP_API_KEY=YOUR_ACTUAL_API_KEY
   ```
   Replace `YOUR_ACTUAL_API_KEY` with your OpenWeatherMap API key.

## Running the Application

### Run both frontend and backend simultaneously (recommended)

```bash
npm run dev
```

### Run only the backend

```bash
npm run start:backend
```

### Run only the frontend

```bash
npm run start:frontend
```

## Accessing the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/weather/:zipcode

## API Endpoint

* `GET /weather/:zipcode`

  Fetches current weather data for the specified US zip code.

  **Example:** `http://localhost:3000/weather/94040`

  **Response:** JSON object containing weather data from OpenWeatherMap. 