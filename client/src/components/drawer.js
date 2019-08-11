import React from 'react';
import { Link } from 'react-router-dom';

import './drawer.css';

function Drawer({ channels, isOpen, toggleDrawer }) {
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

        <Channels channels={channels} />
      </div>
    </>
  );
}

function Channels({ channels }) {
  if (!channels) {
    return '';
  }

  return (
    <nav className="channels">
      <ul>
        {channels.map(channel => (
          <li key={channel._id}>
            <Link to={`/channels/${channel.name}`}>
              <h3 className="channelName">{channel.name}</h3>
              <p className="channelDescription">{channel.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Drawer;
