import React from 'react';
import { Link } from 'react-router-dom';

import './home.css';

function Home({ isLoggedIn }) {
  return (
    <div className="landing">
      {/* Replace this with a proper icon */}
      <div
        style={{
          height: '200px',
          width: '200px',
          margin: '0 auto',
          background: 'rgba(52, 52, 52, 0.5)'
        }}
      />

      <div className="landing__content">
        <h1 className="landing__title">Chat about what matters to you</h1>
        <p className="landing__lead">
          Real-time text chat that emphasizes theme based channels just like
          IRC, but with discoverability!
        </p>

        {isLoggedIn ? (
          <Link className="landing__btn" to="/dashboard">
            Open your dashboard
          </Link>
        ) : (
          <>
            <Link className="landing__btn--alt" to="/register">
              Register
            </Link>
            <Link className="landing__btn landing__login" to="/login">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
