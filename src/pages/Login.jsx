import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const navigate = useNavigate();

  // toggle between login and signup
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignup && !name) {
      setError('Please enter your name');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    // simulate loading like a real API call
    setLoading(true);
    setTimeout(() => {
      // mock auth - just set the user
      setUser({
        name: isSignup ? name : email.split('@')[0],
        email: email,
      });
      setLoading(false);
      navigate('/');
    }, 1000);
  }

  return (
    <div className="login-page">
      <div className="login-box card">
        <div className="login-icon">✈️</div>
        <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="login-subtitle">
          {isSignup
            ? 'Sign up to start saving your trips'
            : 'Login to access your saved trips'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* name field only shown for signup */}
          {isSignup && (
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* show error if any */}
          {error && <p className="error-text">⚠️ {error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* toggle between login / signup */}
        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            className="toggle-btn"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>

        {/* note about mock auth */}
        <div className="mock-note">
          💡 This is mock authentication. Any email and password will work.
        </div>
      </div>
    </div>
  );
}

export default Login;
