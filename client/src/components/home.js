import React from 'react';
import { Link } from 'react-router-dom';

function Home({ isLoggedIn }) {
  return (
    <div>
      {/* Replace this with a proper icon */}
      <div
        style={{
          height: '200px',
          width: '200px',
          margin: '0 auto',
          background: 'rgba(52, 52, 52, 0.5)'
        }}
      ></div>

      <div>
        <h1>assName="landing__title">Chat about what matters to you</h1>
        <p>
          Real-time text chat that emphasizes theme based channels just like
          IRC, but with discoverability!
        </p>

        {isLoggedIn ? (
          <Link to="/dashboard">Open your dashboard</Link>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
