import React, { useState, useEffect } from 'react';
import { getUserChannels } from '../services/api';

import './drawer.css';

function Drawer({ isOpen, toggleDrawer }, props) {
  const drawerClass = `drawer${isOpen ? ' open' : ''}`;
  const backdropClass = `backdrop${isOpen ? ' open' : ''}`;
  const userId = window.localStorage.getItem('id');

  const [userChannels, setUserChannels] = useState([]);

  useEffect(() => {
    async function fetchUserChannels() {
      const channels = await getUserChannels(userId);
      setUserChannels(channels.data);
    }
    fetchUserChannels();
  }, []);

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

        {/*<Channels />*/}
        <div>
          {userChannels ? (
            <ul>
              {userChannels.map(channel => (
                <li key={channel._id}>{channel.name}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}

/*function Channels() {
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
} */

export default Drawer;
