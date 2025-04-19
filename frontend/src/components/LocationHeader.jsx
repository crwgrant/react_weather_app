import WeatherIcon from './WeatherIcon';

export default function LocationHeader({ name, weather, updatedAt }) {
  if (!weather || !weather[0]) return null;

  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div>
      <div>
        <div>
          <h2>{name}</h2>
          <div>
            <p>
              {weather[0].description}
            </p>
          </div>
          <p>Updated at {formattedTime}</p>
        </div>
        
        <div>
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