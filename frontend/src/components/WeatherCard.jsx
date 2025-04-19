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
    <div 
      className={`bg-white p-4 rounded-xl shadow-md transition-all duration-300 transform 
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
      hover:shadow-lg hover:scale-105`}
    >
      <div className="flex items-center mb-2">
        <span className="text-blue-500 mr-2">
          {icon}
        </span>
        <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
} 