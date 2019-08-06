import React from 'react';

import './navigation.css';

function Navigation({ toggleDrawer }) {
  return (
    <div className="navigation">
      <button className="drawerToggler" onClick={e => toggleDrawer()}>
        ☰
      </button>
      <h2 className="tabTitle">Dashboard</h2>
    </div>
  );
}

export default Navigation;
