/**
 * Converts Unix timestamp to a readable time string
 * @param {number} unixTimestamp - Unix timestamp in seconds
 * @returns {string} - Formatted time string (HH:MM AM/PM)
 */
export const formatUnixTimestamp = (unixTimestamp) => {
  // Create a new Date object (multiply by 1000 to convert seconds to milliseconds)
  const date = new Date(unixTimestamp * 1000);
  
  // Format the time in 12-hour format with AM/PM
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}; 