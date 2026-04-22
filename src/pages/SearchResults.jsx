import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import CountryCard from '../components/CountryCard';
import useDebounce from '../hooks/useDebounce';
import './SearchResults.css';

function SearchResults({ user, saveTrip }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cityFromUrl = searchParams.get('city') || '';

  const [inputValue, setInputValue] = useState(cityFromUrl);
  const [searchTerm, setSearchTerm] = useState(cityFromUrl);

  // debounce the input for autocomplete suggestions
  const debouncedInput = useDebounce(inputValue, 400);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [weatherData, setWeatherData] = useState(null);
  const [countryData, setCountryData] = useState(null);

  const [weatherLoading, setWeatherLoading] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);

  const [weatherError, setWeatherError] = useState('');
  const [countryError, setCountryError] = useState('');

  const [savedMessage, setSavedMessage] = useState('');

  // fetch suggestions when user types
  useEffect(() => {
    if (debouncedInput.length < 2) {
      setSuggestions([]);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${debouncedInput}?fields=name,flags,region`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSuggestions(data.slice(0, 5));
        } else {
          setSuggestions([]);
        }
      })
      .catch(() => setSuggestions([]));
  }, [debouncedInput]);

  // fetch weather and country info when searchTerm changes
  useEffect(() => {
    if (!searchTerm) return;
    fetchWeather(searchTerm);
    fetchCountry(searchTerm);
  }, [searchTerm]);

  function fetchWeather(city) {
    setWeatherLoading(true);
    setWeatherError('');
    setWeatherData(null);

    fetch(`https://wttr.in/${city}?format=j1`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not get weather data');
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

  function fetchCountry(name) {
    setCountryLoading(true);
    setCountryError('');
    setCountryData(null);

    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,currencies,languages,region,subregion,area,timezones`)
      .then((res) => {
        if (!res.ok) throw new Error('Country not found');
        return res.json();
      })
      .then((data) => {
        // API returns an array, we take first result
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

  function handleSearch(e) {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    setSearchTerm(inputValue);
    setShowSuggestions(false);
  }

  function handleSuggestionClick(suggestion) {
    const name = suggestion.name.common;
    setInputValue(name);
    setSearchTerm(name);
    setShowSuggestions(false);
    setSuggestions([]);
  }

  function handleSaveTrip() {
    if (!user) {
      alert('Please login first to save trips!');
      navigate('/login');
      return;
    }

    const tripData = {
      city: searchTerm,
      country: countryData?.name?.common || '',
      flag: countryData?.flags?.png || '',
      temp: weatherData?.current_condition[0]?.temp_C || '',
      savedAt: new Date().toISOString(),
    };

    saveTrip(tripData);
    setSavedMessage('Trip saved successfully! ✅');
    setTimeout(() => setSavedMessage(''), 3000);
  }

  return (
    <div className="search-results-page">
      {/* search bar at top */}
      <form onSubmit={handleSearch} className="top-search-form">
        <div className="search-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search city or country..."
            className="top-search-input"
          />

          {/* autocomplete suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onMouseDown={() => handleSuggestionClick(s)}
                  className="suggestion-item"
                >
                  {s.flags?.png && (
                    <img src={s.flags.png} alt="" className="suggestion-flag" />
                  )}
                  <span>{s.name.common}</span>
                  <span className="suggestion-region">{s.region}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* show heading and save button if there are results */}
      {searchTerm && (
        <div className="results-header">
          <h2>Results for: <span className="city-name">{searchTerm}</span></h2>
          <div className="header-right">
            {savedMessage && <span className="saved-msg">{savedMessage}</span>}
            <button onClick={handleSaveTrip} className="save-trip-btn">
              💾 Save Trip
            </button>
            <button
              onClick={() => navigate(`/trip/${searchTerm}`)}
              className="details-btn"
            >
              📋 Full Details
            </button>
          </div>
        </div>
      )}

      {/* results grid */}
      <div className="results-grid">
        {/* weather section */}
        <div className="result-section">
          <h3 className="section-title">Weather Info</h3>
          {weatherLoading && <p className="loading-text">Loading weather...</p>}
          {weatherError && (
            <div className="error-box">❌ {weatherError}</div>
          )}
          {!weatherLoading && !weatherError && weatherData && (
            <WeatherCard weatherData={weatherData} />
          )}
        </div>

        {/* country section */}
        <div className="result-section">
          <h3 className="section-title">Country Info</h3>
          {countryLoading && <p className="loading-text">Loading country info...</p>}
          {countryError && (
            <div className="error-box">❌ {countryError}</div>
          )}
          {!countryLoading && !countryError && countryData && (
            <CountryCard countryData={countryData} />
          )}
        </div>
      </div>

      {/* empty state */}
      {!searchTerm && (
        <div className="empty-state">
          <p>🔍 Enter a city or country name to get started</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
