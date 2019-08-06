import React from 'react';
import Drawer from './drawer';
import Navigation from './navigation';

import './dashboard.css';

function Dashboard() {
  return (
    // TODO: extract parent component and only leave dashboard
    <div className="parent">
      <Drawer />

      <div className="tabContent">
        <Navigation />

        <div className="dashboard">
          <p>Welcome to your dashboard ! Go ahead and...</p>
          <div>
            <input
              className="searchInput"
              type="text"
              placeholder="Find existing channels"
            />{' '}
            <span className="actionsDivider">or...</span>{' '}
            <button className="createButton">Create a new one</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
