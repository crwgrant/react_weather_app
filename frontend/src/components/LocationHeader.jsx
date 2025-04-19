import WeatherIcon from './WeatherIcon';

export default function LocationHeader({ name, weather, updatedAt }) {
  if (!weather || !weather[0]) return null;

  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg mb-6 w-full mx-auto border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <div className="flex items-center mt-1">
            <p className="text-xl capitalize font-medium text-gray-700">
              {weather[0].description}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">Updated at {formattedTime}</p>
        </div>
        
        <div className="flex-shrink-0">
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