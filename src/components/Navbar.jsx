import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, setUser, darkMode, setDarkMode }) {
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">✈️ Travel Planner</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        {user && <li><Link to="/my-trips">My Trips</Link></li>}
      </ul>

      <div className="navbar-right">
        {/* dark mode button */}
        <button
          className="dark-mode-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {user ? (
          <div className="user-info">
            <span>Hello, {user.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
