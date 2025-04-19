import { useState } from 'react'
import { getWeatherByZipcode } from './services/api'
import { formatUnixTimestamp } from './utils/dateUtils'
import WeatherCard from './components/WeatherCard'
import WeatherIcon from './components/WeatherIcon'
import LocationHeader from './components/LocationHeader'
import { 
  ThermometerIcon, 
  WindIcon, 
  CloudIcon, 
  DropletIcon, 
  PressureIcon, 
  SunriseIcon, 
  SunsetIcon,
  SearchIcon
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
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) return 'from-blue-400 to-blue-600'
    
    const weatherCode = weatherData.weather[0].icon
    // Day conditions
    if (weatherCode.includes('01d')) return 'from-yellow-400 to-orange-500' // Clear sky
    if (weatherCode.includes('02d')) return 'from-blue-300 to-blue-500' // Few clouds
    if (weatherCode.includes('03d') || weatherCode.includes('04d')) return 'from-blue-400 to-gray-400' // Clouds
    if (weatherCode.includes('09d') || weatherCode.includes('10d')) return 'from-blue-400 to-gray-600' // Rain
    if (weatherCode.includes('11d')) return 'from-gray-700 to-gray-900' // Thunderstorm
    if (weatherCode.includes('13d')) return 'from-blue-100 to-blue-300' // Snow
    if (weatherCode.includes('50d')) return 'from-gray-300 to-gray-500' // Mist
    
    // Night conditions
    if (weatherCode.includes('n')) return 'from-blue-900 to-indigo-900'
    
    return 'from-blue-400 to-blue-600' // Default
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-4xl">
        {/* Header/Title */}
        <div className="text-center mb-8 motion-safe:animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-sm">
            Weather Explorer
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Get real-time weather information for any location</p>
        </div>
        
        {/* Search Box */}
        <div className="bg-white rounded-xl p-5 shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-row items-center">
            <div className="flex-1 relative mr-6">
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter zip code (e.g. 10001)"
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 rounded-lg py-3 px-3 h-10"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-3 px-6 h-10 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              ) : null}
              {loading ? 'Searching...' : 'Get Weather'}
            </button>
          </form>
        </div>
        
        {/* Error Message */}
        {error && !loading && (
          <div className="bg-red-500 text-white px-4 py-3 rounded-xl mb-6 shadow-lg slide-in-top">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {/* Weather Content */}
        {weatherData && !loading && (
          <div className="space-y-6">
            {/* Location Header */}
            <LocationHeader name={weatherData.name} weather={weatherData.weather} />
            
            {/* Main Temperature */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-gray-600 mb-2 text-lg">Current Temperature</h3>
                <p className="text-6xl font-bold text-gray-800">
                  {Math.round(weatherData.main.temp)}°F
                </p>
                <p className="text-gray-600 mt-2">
                  Feels like {Math.round(weatherData.main.feels_like)}°F
                </p>
                <div className="flex items-center justify-center mt-4 gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-sm">Min</span>
                    <span className="text-gray-800 font-bold">{Math.round(weatherData.main.temp_min)}°F</span>
                  </div>
                  <div className="h-8 border-r border-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-sm">Max</span>
                    <span className="text-gray-800 font-bold">{Math.round(weatherData.main.temp_max)}°F</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <div className="flex flex-col items-center">
              <CloudIcon />
              <h3 className="text-xl font-medium text-gray-800 mt-4">Enter a zip code to get started</h3>
              <p className="text-gray-600 mt-2">
                Search for any US zip code to see detailed weather information
              </p>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by OpenWeatherMap API</p>
        </div>
      </div>
    </div>
  )
}

export default App
