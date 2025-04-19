import { useState } from 'react'
import { getWeatherByZipcode } from './services/api'
import { formatUnixTimestamp } from './utils/dateUtils'
import './App.css'

function App() {
  const [zipcode, setZipcode] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!zipcode || zipcode.length < 5) {
      setError('Please enter a valid zipcode')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const data = await getWeatherByZipcode(zipcode)
      setWeatherData(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-white mb-10">Weather App</h1>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Zipcode
            </label>
            <div className="flex">
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter zipcode (e.g. 10001)"
                className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-200 disabled:bg-blue-300"
              >
                {loading ? 'Loading...' : 'Get Weather'}
              </button>
            </div>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {weatherData && !loading && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{weatherData.name}</h2>
              {weatherData.weather[0] && (
                <img 
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                  alt={weatherData.weather[0].description}
                  className="w-16 h-16"
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 font-medium">Temperature</h3>
                <p className="text-xl font-bold">{weatherData.main.temp}°F</p>
                <p className="text-sm text-gray-500">
                  Feels like: {weatherData.main.feels_like}°F
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 font-medium">Weather</h3>
                <p className="text-xl font-bold capitalize">
                  {weatherData.weather[0]?.main}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {weatherData.weather[0]?.description}
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 font-medium">Wind</h3>
                <p className="text-xl font-bold">{weatherData.wind.speed} mph</p>
                <p className="text-sm text-gray-500">
                  Direction: {weatherData.wind.deg}°
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 font-medium">Humidity</h3>
                <p className="text-xl font-bold">{weatherData.main.humidity}%</p>
                <p className="text-sm text-gray-500">
                  Pressure: {weatherData.main.pressure} hPa
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 font-medium">Sunrise</h3>
                <p className="text-xl font-bold">
                  {formatUnixTimestamp(weatherData.sys.sunrise)}
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 font-medium">Sunset</h3>
                <p className="text-xl font-bold">
                  {formatUnixTimestamp(weatherData.sys.sunset)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
