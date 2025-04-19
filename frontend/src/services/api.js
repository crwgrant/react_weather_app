// We'll use relative paths which will be handled by the Vite proxy

/**
 * Fetches weather data for the provided zipcode
 * @param {string} zipcode - The zipcode to fetch weather data for
 * @returns {Promise<Object>} - The weather data
 */
export const getWeatherByZipcode = async (zipcode) => {
  try {
    const response = await fetch(`/weather/${zipcode}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}; 