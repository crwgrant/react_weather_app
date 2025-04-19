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
      className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-2">
        <span className="mr-3 text-blue-500">
          {icon}
        </span>
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
} 