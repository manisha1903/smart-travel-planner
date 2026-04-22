import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import SearchResults from './pages/SearchResults.jsx';
import TripDetails from './pages/TripDetails.jsx';
import MyTrips from './pages/MyTrips.jsx';
import Login from './pages/Login.jsx';
import './App.css';

function App() {
  // I am storing user in state so navbar can also access it
  const [user, setUser] = useState(null);

  // trips are saved in localStorage
  const [savedTrips, setSavedTrips] = useState(() => {
    const data = localStorage.getItem('myTrips');
    return data ? JSON.parse(data) : [];
  });

  // dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  function saveTrip(trip) {
    // check if already saved
    const alreadySaved = savedTrips.find((t) => t.city === trip.city);
    if (alreadySaved) {
      alert('This trip is already saved!');
      return;
    }
    const updated = [...savedTrips, trip];
    setSavedTrips(updated);
    localStorage.setItem('myTrips', JSON.stringify(updated));
  }

  function removeTrip(city) {
    const updated = savedTrips.filter((t) => t.city !== city);
    setSavedTrips(updated);
    localStorage.setItem('myTrips', JSON.stringify(updated));
  }

  return (
    <BrowserRouter>
      <div className={darkMode ? 'app dark' : 'app'}>
        <Navbar
          user={user}
          setUser={setUser}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/search"
              element={
                <SearchResults
                  user={user}
                  saveTrip={saveTrip}
                />
              }
            />

            <Route
              path="/trip/:cityName"
              element={
                <TripDetails
                  user={user}
                  saveTrip={saveTrip}
                />
              }
            />

            <Route
              path="/my-trips"
              element={
                user ? (
                  <MyTrips
                    savedTrips={savedTrips}
                    removeTrip={removeTrip}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/login"
              element={<Login setUser={setUser} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
