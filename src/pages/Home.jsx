import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchInput.trim() === '') {
      alert('Please enter a city or country name');
      return;
    }
    navigate(`/search?city=${searchInput}`);
  }

  // some popular destinations to show on home page
  const popularPlaces = [
    { name: 'Paris', country: 'France', emoji: '🗼' },
    { name: 'Tokyo', country: 'Japan', emoji: '⛩️' },
    { name: 'New York', country: 'USA', emoji: '🗽' },
    { name: 'Dubai', country: 'UAE', emoji: '🏙️' },
    { name: 'London', country: 'UK', emoji: '🎡' },
    { name: 'Sydney', country: 'Australia', emoji: '🦘' },
  ];

  return (
    <div className="home-page">
      {/* hero section */}
      <div className="hero">
        <h1>Plan Your Dream Trip ✈️</h1>
        <p>Search any city to get weather, country info and more</p>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search city or country... (e.g. Paris, Japan)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      {/* popular destinations */}
      <div className="popular-section">
        <h2>Popular Destinations</h2>
        <div className="places-grid">
          {popularPlaces.map((place) => (
            <div
              key={place.name}
              className="place-card card"
              onClick={() => navigate(`/search?city=${place.name}`)}
            >
              <span className="place-emoji">{place.emoji}</span>
              <h3>{place.name}</h3>
              <p>{place.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
