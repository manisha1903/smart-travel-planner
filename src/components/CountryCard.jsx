import React from 'react';
import './CountryCard.css';

function CountryCard({ countryData }) {
  if (!countryData) {
    return <p>Country information not found.</p>;
  }

  // getting currency names
  let currencies = 'N/A';
  if (countryData.currencies) {
    currencies = Object.values(countryData.currencies)
      .map((c) => `${c.name} (${c.symbol})`)
      .join(', ');
  }

  // getting languages
  let languages = 'N/A';
  if (countryData.languages) {
    languages = Object.values(countryData.languages).join(', ');
  }

  return (
    <div className="country-card card">
      <div className="country-header">
        {countryData.flags && (
          <img
            src={countryData.flags.png}
            alt={`${countryData.name.common} flag`}
            className="country-flag"
          />
        )}
        <div>
          <h3>{countryData.name.common}</h3>
          <p className="official-name">{countryData.name.official}</p>
        </div>
      </div>

      <div className="country-info">
        <div className="info-row">
          <span className="info-label">🏛️ Capital</span>
          <span>{countryData.capital ? countryData.capital[0] : 'N/A'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">🌍 Region</span>
          <span>{countryData.region} - {countryData.subregion}</span>
        </div>
        <div className="info-row">
          <span className="info-label">👥 Population</span>
          <span>{countryData.population?.toLocaleString()}</span>
        </div>
        <div className="info-row">
          <span className="info-label">📐 Area</span>
          <span>{countryData.area?.toLocaleString()} km²</span>
        </div>
        <div className="info-row">
          <span className="info-label">💵 Currency</span>
          <span>{currencies}</span>
        </div>
        <div className="info-row">
          <span className="info-label">🗣️ Languages</span>
          <span>{languages}</span>
        </div>
        <div className="info-row">
          <span className="info-label">🕐 Timezones</span>
          <span>{countryData.timezones?.slice(0, 2).join(', ')}</span>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
