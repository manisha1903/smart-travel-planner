import React from 'react';
import './WeatherCard.css';

// this component shows weather info for a city
function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return <p>No weather data available.</p>;
  }

  const current = weatherData.current_condition[0];
  const tempC = current.temp_C;
  const tempF = current.temp_F;
  const description = current.weatherDesc[0].value;
  const humidity = current.humidity;
  const windSpeed = current.windspeedKmph;
  const feelsLike = current.FeelsLikeC;

  return (
    <div className="weather-card card">
      <h3>🌤️ Current Weather</h3>

      <div className="weather-main">
        <span className="temperature">{tempC}°C</span>
        <span className="temp-f">({tempF}°F)</span>
      </div>

      <p className="weather-desc">{description}</p>

      <div className="weather-details">
        <div className="weather-detail-item">
          <span className="label">Feels Like</span>
          <span>{feelsLike}°C</span>
        </div>
        <div className="weather-detail-item">
          <span className="label">Humidity</span>
          <span>{humidity}%</span>
        </div>
        <div className="weather-detail-item">
          <span className="label">Wind Speed</span>
          <span>{windSpeed} km/h</span>
        </div>
      </div>

      {/* 3 day forecast */}
      <div className="forecast">
        <h4>3-Day Forecast</h4>
        <div className="forecast-days">
          {weatherData.weather.slice(0, 3).map((day, index) => (
            <div key={index} className="forecast-day">
              <p className="day-label">
                {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : 'Day 3'}
              </p>
              <p>{day.maxtempC}° / {day.mintempC}°</p>
              <p className="day-desc">
                {day.hourly[4]?.weatherDesc[0]?.value || ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
