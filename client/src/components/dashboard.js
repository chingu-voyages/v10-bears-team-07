import React from 'react';

import './dashboard.css';

function Dashboard() {
  return (
    <div>
      <div>drawer goes here</div>

      <div className="tabContent">
        <div>navigation goes here</div>

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
