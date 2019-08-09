import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from './drawer';
import Navigation from './navigation';

import './dashboard.css';

function Dashboard({ channels }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    // TODO: extract parent component and only leave dashboard
    <div className="parent">
      <Drawer channels={channels} toggleDrawer={toggleDrawer} isOpen={open} />

      <div className="tabContent">
        <Navigation toggleDrawer={toggleDrawer} />

        <div className="dashboard">
          <p>Welcome to your dashboard ! Go ahead and...</p>
          <div>
            <input
              className="searchInput"
              type="text"
              placeholder="Find existing channels"
            />{' '}
            <span className="actionsDivider">or...</span>{' '}
            <Link className="createLink" to="/channel/new">
              Create a new one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
