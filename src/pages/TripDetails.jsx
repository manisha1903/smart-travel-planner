import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import CountryCard from '../components/CountryCard';
import './TripDetails.css';

function TripDetails({ user, saveTrip }) {
  const { cityName } = useParams();
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState(null);
  const [countryData, setCountryData] = useState(null);

  const [weatherLoading, setWeatherLoading] = useState(true);
  const [countryLoading, setCountryLoading] = useState(true);

  const [weatherError, setWeatherError] = useState('');
  const [countryError, setCountryError] = useState('');

  const [savedMessage, setSavedMessage] = useState('');

  // fetch data when page loads
  useEffect(() => {
    if (!cityName) return;
    fetchWeather();
    fetchCountryInfo();
  }, [cityName]);

  function fetchWeather() {
    setWeatherLoading(true);
    fetch(`https://wttr.in/${cityName}?format=j1`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch weather');
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        setWeatherLoading(false);
      })
      .catch((err) => {
        setWeatherError(err.message);
        setWeatherLoading(false);
      });
  }

  function fetchCountryInfo() {
    setCountryLoading(true);
    fetch(
      `https://restcountries.com/v3.1/name/${cityName}?fields=name,capital,population,flags,currencies,languages,region,subregion,area,timezones`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Country not found');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCountryData(data[0]);
        }
        setCountryLoading(false);
      })
      .catch((err) => {
        setCountryError(err.message);
        setCountryLoading(false);
      });
  }

  function handleSave() {
    if (!user) {
      alert('You need to login first!');
      navigate('/login');
      return;
    }
    const trip = {
      city: cityName,
      country: countryData?.name?.common || '',
      flag: countryData?.flags?.png || '',
      temp: weatherData?.current_condition[0]?.temp_C || '',
      savedAt: new Date().toISOString(),
    };
    saveTrip(trip);
    setSavedMessage('✅ Trip saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  }

  // some fake attractions to make page look complete
  // in real app this would come from Foursquare API
  const attractions = [
    { name: 'City Museum', type: 'Museum', rating: '4.5' },
    { name: 'Central Park', type: 'Park', rating: '4.7' },
    { name: 'Old Town Square', type: 'Landmark', rating: '4.6' },
    { name: 'Local Food Market', type: 'Food', rating: '4.3' },
    { name: 'Art Gallery', type: 'Art', rating: '4.4' },
  ];

  return (
    <div className="trip-details-page">
      {/* back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      {/* page heading */}
      <div className="details-header">
        <div className="details-title">
          {countryData?.flags?.png && (
            <img
              src={countryData.flags.png}
              alt="flag"
              className="details-flag"
            />
          )}
          <div>
            <h1>{cityName}</h1>
            {countryData && (
              <p className="details-subtitle">
                {countryData.name.common} · {countryData.region}
              </p>
            )}
          </div>
        </div>

        <div className="details-actions">
          {savedMessage && (
            <span className="saved-message">{savedMessage}</span>
          )}
          <button onClick={handleSave} className="save-btn">
            💾 Save Trip
          </button>
        </div>
      </div>

      {/* weather and country cards */}
      <div className="details-grid">
        <div>
          <h3 className="section-label">Weather</h3>
          {weatherLoading && <p className="loading">Loading weather data...</p>}
          {weatherError && <p className="error-msg">⚠️ {weatherError}</p>}
          {!weatherLoading && weatherData && (
            <WeatherCard weatherData={weatherData} />
          )}
        </div>

        <div>
          <h3 className="section-label">Country Details</h3>
          {countryLoading && <p className="loading">Loading country info...</p>}
          {countryError && <p className="error-msg">⚠️ {countryError}</p>}
          {!countryLoading && countryData && (
            <CountryCard countryData={countryData} />
          )}
        </div>
      </div>

      {/* attractions section */}
      <div className="attractions-section">
        <h2>🏙️ Top Attractions</h2>
        <div className="attractions-grid">
          {attractions.map((item, index) => (
            <div key={index} className="attraction-card card">
              <div className="attraction-type">{item.type}</div>
              <h4>{item.name}</h4>
              <div className="attraction-rating">⭐ {item.rating}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
