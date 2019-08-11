import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { channels } from '../services/api';

import './dashboard.css';

function Dashboard() {
  const [fetchedChannels, setChannels] = useState([]);
  const [searchKeyword, setKeyword] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className="dashboard">
      <p>Welcome to your dashboard ! Go ahead and...</p>
      {error && <p>An error occured: {error}</p>}
      <div>
        <input
          className="searchInput"
          onKeyPress={e => e.key === 'Enter' && searchChannels()}
          onChange={e => setKeyword(e.target.value)}
          value={searchKeyword}
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

  async function searchChannels() {
    const result = await channels.getChannels(searchKeyword);
    if (result.error) {
      return setError(result);
    }

    setChannels(result.channels);
  }
}

export default Dashboard;
