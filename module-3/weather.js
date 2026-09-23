async function getWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=14.6&longitude=121.0&current_weather=true');
    const data = await response.json();
    console.log('Current weather:', data.current_weather);
  } catch (error) {
    console.error('Error:', error);
  }
}

getWeather();