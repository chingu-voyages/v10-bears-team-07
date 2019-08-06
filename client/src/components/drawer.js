import React from 'react';

import './drawer.css';

function Drawer({ isOpen, toggleDrawer }) {
  const drawerClass = `drawer${isOpen ? ' open' : ''}`;
  const backdropClass = `backdrop${isOpen ? ' open' : ''}`;
  return (
    <>
      <div className={backdropClass} onClick={toggleDrawer}></div>
      <div className={drawerClass}>
        <div className="drawerActions">
          <input
            className="filterInput"
            type="text"
            placeholder="Filter your channels"
          />{' '}
          <button className="optionsButton">⋮</button>
        </div>

        <Channels />
      </div>
    </>
  );
}

function Channels() {
  return (
    <nav className="channels">
      <ul>
        <li>
          <a href="#">
            <h3 className="channelName">Channel 1</h3>
            <p className="channelDescription">Channel 1 description</p>
          </a>
        </li>
        <li>
          <a href="#">
            <h3 className="channelName">Channel 2</h3>
            <p className="channelDescription">Channel 2 description</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Drawer;
