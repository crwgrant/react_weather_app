import WeatherIcon from './WeatherIcon';

export default function LocationHeader({ name, weather, updatedAt }) {
  if (!weather || !weather[0]) return null;

  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{name}</h2>
          <div className="flex items-center justify-center sm:justify-start mb-1">
            <p className="text-lg text-gray-600 capitalize">
              {weather[0].description}
            </p>
          </div>
          <p className="text-sm text-gray-500">Updated at {formattedTime}</p>
        </div>
        
        <div className="text-center">
          <WeatherIcon 
            iconCode={weather[0].icon} 
            description={weather[0].description}
            size="large"
          />
        </div>
      </div>
    </div>
  );
} 