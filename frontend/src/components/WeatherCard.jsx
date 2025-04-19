import { useState, useEffect } from 'react';

export default function WeatherCard({ icon, title, value, subtitle, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div>
      <div>
        <span>
          {icon}
        </span>
        <h3>{title}</h3>
      </div>
      <p>{value}</p>
      {subtitle && (
        <p>{subtitle}</p>
      )}
    </div>
  );
} 