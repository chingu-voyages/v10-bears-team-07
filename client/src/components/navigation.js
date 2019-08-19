import React from 'react';

import './navigation.css';

function Navigation({ toggleDrawer, notification, pageTitle }) {
  return (
    <div className="navigation">
      <button className="drawerToggler" onClick={toggleDrawer}>
        ☰
      </button>
      <h2 className="tabTitle">{pageTitle}</h2>
    </div>
  );
}

export default Navigation;
