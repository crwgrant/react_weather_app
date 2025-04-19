import { useState } from 'react'
import { getWeatherByZipcode } from './services/api'
import { formatUnixTimestamp } from './utils/dateUtils'
import WeatherCard from './components/WeatherCard'
import LocationHeader from './components/LocationHeader'
import { 
  ThermometerIcon, 
  WindIcon, 
  CloudIcon, 
  DropletIcon, 
  PressureIcon, 
  SunriseIcon, 
  SunsetIcon
} from './components/Icons'

function App() {
  const [zipcode, setZipcode] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!zipcode || zipcode.length < 5) {
      setError('Please enter a valid zip code')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setIsFirstLoad(false)
      
      const data = await getWeatherByZipcode(zipcode)
      setWeatherData(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherBackground = () => {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) return ''
    
    const weatherCode = weatherData.weather[0].icon
    // Day conditions
    if (weatherCode.includes('01d')) return '' // Clear sky
    if (weatherCode.includes('02d')) return '' // Few clouds
    if (weatherCode.includes('03d') || weatherCode.includes('04d')) return '' // Clouds
    if (weatherCode.includes('09d') || weatherCode.includes('10d')) return '' // Rain
    if (weatherCode.includes('11d')) return '' // Thunderstorm
    if (weatherCode.includes('13d')) return '' // Snow
    if (weatherCode.includes('50d')) return '' // Mist
    
    // Night conditions
    if (weatherCode.includes('n')) return ''
    
    return '' // Default
  }

  return (
    <div>
      <div>
        {/* Header/Title */}
        <div>
          <h1>
            Weather Explorer
          </h1>
          <p>Get real-time weather information for any location</p>
        </div>
        
        {/* Search Box */}
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter zip code (e.g. 10001)"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div></div>
              ) : null}
              {loading ? 'Searching...' : 'Get Weather'}
            </button>
          </form>
        </div>
        
        {/* Error Message */}
        {error && !loading && (
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {/* Weather Content */}
        {weatherData && !loading && (
          <div>
            {/* Location Header */}
            <LocationHeader name={weatherData.name} weather={weatherData.weather} />
            
            {/* Main Temperature */}
            <div>
              <div>
                <h3>Current Temperature</h3>
                <p>
                  {Math.round(weatherData.main.temp)}°F
                </p>
                <p>
                  Feels like {Math.round(weatherData.main.feels_like)}°F
                </p>
                <div>
                  <div>
                    <span>Min</span>
                    <span>{Math.round(weatherData.main.temp_min)}°F</span>
                  </div>
                  <div></div>
                  <div>
                    <span>Max</span>
                    <span>{Math.round(weatherData.main.temp_max)}°F</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weather Details Grid */}
            <div>
              <WeatherCard 
                icon={<ThermometerIcon />}
                title="Weather"
                value={weatherData.weather[0]?.main}
                subtitle={weatherData.weather[0]?.description}
                delay={100}
              />
              
              <WeatherCard 
                icon={<WindIcon />}
                title="Wind"
                value={`${weatherData.wind.speed} mph`}
                subtitle={`Direction: ${weatherData.wind.deg}°`}
                delay={200}
              />
              
              <WeatherCard 
                icon={<DropletIcon />}
                title="Humidity"
                value={`${weatherData.main.humidity}%`}
                delay={300}
              />
              
              <WeatherCard 
                icon={<PressureIcon />}
                title="Pressure"
                value={`${weatherData.main.pressure} hPa`}
                delay={400}
              />
              
              <WeatherCard 
                icon={<SunriseIcon />}
                title="Sunrise"
                value={formatUnixTimestamp(weatherData.sys.sunrise)}
                delay={500}
              />
              
              <WeatherCard 
                icon={<SunsetIcon />}
                title="Sunset"
                value={formatUnixTimestamp(weatherData.sys.sunset)}
                delay={600}
              />
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {isFirstLoad && !loading && !weatherData && !error && (
          <div>
            <div>
              <CloudIcon />
              <h3>Enter a zip code to get started</h3>
              <p>
                Search for any US zip code to see detailed weather information
              </p>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div>
          <p>Powered by OpenWeatherMap API</p>
        </div>
      </div>
    </div>
  )
}

export default App
