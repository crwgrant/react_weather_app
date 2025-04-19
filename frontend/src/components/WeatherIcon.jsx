import { useState, useEffect } from 'react';

const weatherAnimations = {
  // Clear sky
  '01d': 'scale-in-center',
  '01n': 'scale-in-center',
  // Few clouds
  '02d': 'slide-in-right',
  '02n': 'slide-in-right',
  // Scattered clouds
  '03d': 'slide-in-left',
  '03n': 'slide-in-left',
  // Broken clouds
  '04d': 'slide-in-top',
  '04n': 'slide-in-top',
  // Shower rain
  '09d': 'slide-in-bottom',
  '09n': 'slide-in-bottom',
  // Rain
  '10d': 'bounce-in-bottom',
  '10n': 'bounce-in-bottom',
  // Thunderstorm
  '11d': 'vibrate-1',
  '11n': 'vibrate-1',
  // Snow
  '13d': 'swing-in-top-fwd',
  '13n': 'swing-in-top-fwd',
  // Mist
  '50d': 'blur-in',
  '50n': 'blur-in',
};

export default function WeatherIcon({ iconCode, description, size = 'large' }) {
  const [animationClass, setAnimationClass] = useState('');
  
  // Apply animation classes after component mount
  useEffect(() => {
    setAnimationClass(weatherAnimations[iconCode] || 'scale-in-center');
  }, [iconCode]);
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };
  
  return (
    <div>
      <img 
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt={description || 'Weather icon'}
        className={`${sizeClasses[size]} ${animationClass} drop-shadow-lg`}
      />
    </div>
  );
} 