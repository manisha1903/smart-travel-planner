import React from 'react';
import { useNavigate } from 'react-router-dom';
import TripCard from '../components/TripCard';
import './MyTrips.css';

function MyTrips({ savedTrips, removeTrip }) {
  const navigate = useNavigate();

  return (
    <div className="my-trips-page">
      <div className="my-trips-header">
        <h1>My Saved Trips ✈️</h1>
        <button
          className="add-trip-btn"
          onClick={() => navigate('/search')}
        >
          + Search New Destination
        </button>
      </div>

      {savedTrips.length === 0 ? (
        // show this when no trips saved
        <div className="no-trips">
          <p className="no-trips-emoji">🗺️</p>
          <h3>No trips saved yet!</h3>
          <p>Go search for a destination and save it here.</p>
          <button
            className="go-search-btn"
            onClick={() => navigate('/search')}
          >
            Start Exploring
          </button>
        </div>
      ) : (
        <div>
          <p className="trips-count">
            You have {savedTrips.length} saved trip{savedTrips.length > 1 ? 's' : ''}
          </p>
          <div className="trips-grid">
            {savedTrips.map((trip, index) => (
              <TripCard
                key={index}
                trip={trip}
                removeTrip={removeTrip}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
