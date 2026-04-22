import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TripCard.css';

function TripCard({ trip, removeTrip }) {
  const navigate = useNavigate();

  return (
    <div className="trip-card card">
      <div className="trip-card-header">
        {trip.flag && (
          <img src={trip.flag} alt="flag" className="trip-flag" />
        )}
        <div>
          <h3>{trip.city}</h3>
          <p className="trip-country">{trip.country}</p>
        </div>
      </div>

      {trip.temp && (
        <p className="trip-temp">🌡️ {trip.temp}°C when saved</p>
      )}

      <p className="trip-date">
        📅 Saved on: {new Date(trip.savedAt).toLocaleDateString()}
      </p>

      <div className="trip-card-buttons">
        <button
          className="view-btn"
          onClick={() => navigate(`/trip/${trip.city}`)}
        >
          View Details
        </button>
        <button
          className="remove-btn"
          onClick={() => removeTrip(trip.city)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default TripCard;
