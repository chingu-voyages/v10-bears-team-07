import React from 'react';
import { Link } from 'react-router-dom';

import './dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <p>Welcome to your dashboard ! Go ahead and...</p>
      <div>
        <input
          className="searchInput"
          type="text"
          placeholder="Find existing channels"
        />{' '}
        <span className="actionsDivider">or...</span>{' '}
        <Link className="createLink" to="/channels/new">
          Create a new one
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
