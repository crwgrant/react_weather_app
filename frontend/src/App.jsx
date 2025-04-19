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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-10">
        {/* Header/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Weather Explorer
          </h1>
          <p className="text-lg text-gray-600">Get real-time weather information for any location</p>
        </div>
        
        {/* Search Box */}
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex-grow w-full sm:w-auto">
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter zip code (e.g. 10001)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              ) : null}
              {loading ? 'Searching...' : 'Get Weather'}
            </button>
          </form>
        </div>
        
        {/* Error Message */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <div className="flex items-center">
              <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {/* Weather Content */}
        {weatherData && !loading && (
          <div className="animate-fade-in">
            {/* Location Header */}
            <LocationHeader name={weatherData.name} weather={weatherData.weather} />
            
            {/* Main Temperature */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg mb-6 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 opacity-90">Current Temperature</h3>
                <p className="text-6xl font-bold">
                  {Math.round(weatherData.main.temp)}°F
                </p>
                <p className="text-lg opacity-80">
                  Feels like {Math.round(weatherData.main.feels_like)}°F
                </p>
                <div className="flex justify-center items-center gap-6 mt-4 text-sm">
                  <div className="text-center">
                    <span className="block font-medium">Min</span>
                    <span className="block opacity-90">{Math.round(weatherData.main.temp_min)}°F</span>
                  </div>
                  <div className="border-l border-white opacity-50 h-6"></div>
                  <div className="text-center">
                    <span className="block font-medium">Max</span>
                    <span className="block opacity-90">{Math.round(weatherData.main.temp_max)}°F</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <WeatherCard 
                icon={<ThermometerIcon className="w-6 h-6 text-blue-500" />}
                title="Weather"
                value={weatherData.weather[0]?.main}
                subtitle={weatherData.weather[0]?.description}
                delay={100}
              />
              
              <WeatherCard 
                icon={<WindIcon className="w-6 h-6 text-blue-500" />}
                title="Wind"
                value={`${weatherData.wind.speed} mph`}
                subtitle={`Direction: ${weatherData.wind.deg}°`}
                delay={200}
              />
              
              <WeatherCard 
                icon={<DropletIcon className="w-6 h-6 text-blue-500" />}
                title="Humidity"
                value={`${weatherData.main.humidity}%`}
                delay={300}
              />
              
              <WeatherCard 
                icon={<PressureIcon className="w-6 h-6 text-blue-500" />}
                title="Pressure"
                value={`${weatherData.main.pressure} hPa`}
                delay={400}
              />
              
              <WeatherCard 
                icon={<SunriseIcon className="w-6 h-6 text-yellow-500" />}
                title="Sunrise"
                value={formatUnixTimestamp(weatherData.sys.sunrise)}
                delay={500}
              />
              
              <WeatherCard 
                icon={<SunsetIcon className="w-6 h-6 text-orange-500" />}
                title="Sunset"
                value={formatUnixTimestamp(weatherData.sys.sunset)}
                delay={600}
              />
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {isFirstLoad && !loading && !weatherData && !error && (
          <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="flex flex-col items-center text-gray-500">
              <CloudIcon className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enter a zip code to get started</h3>
              <p className="text-base max-w-xs">
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
