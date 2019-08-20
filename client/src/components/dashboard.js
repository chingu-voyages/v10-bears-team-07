import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { channels } from '../services/api';

import './dashboard.css';

function Dashboard({ history, user, onChannelJoin, setTitle }) {
  const [fetchedChannels, setChannels] = useState(undefined);
  const [searchKeyword, setKeyword] = useState('');
  const [error, setError] = useState(null);

  setTitle('Dashboard');

  return (
    <div className="dashboard">
      <div className="channelControls">
        <p>Welcome to your dashboard ! Go ahead and...</p>
        {error && <p>An error occured: {error}</p>}
        <input
          className="searchInput"
          onKeyPress={e => e.key === 'Enter' && searchChannels()}
          onChange={e => setKeyword(e.target.value)}
          value={searchKeyword}
          type="text"
          placeholder="Find existing channels"
        />{' '}
        <span className="actionsDivider">or...</span>{' '}
        <Link className="createLink" to="/channel/new">
          Create a new one
        </Link>
      </div>

      {fetchedChannels &&
        (fetchedChannels.length === 0 ? (
          <p>There are no channels that match</p>
        ) : (
          <table className="searchResult">
            <tbody>
              {fetchedChannels.map(channel => (
                <tr key={channel._id} className="channel">
                  <td className="channel__name">{channel.name}</td>
                  <td className="channel__desc">{channel.description}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => joinChannel(channel._id)}
                    >
                      Join
                    </button>
                  </td>
                  <td className="channel__count">
                    {channel.members.length + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </div>
  );

  async function searchChannels() {
    const result = await channels.getChannels({
      userId: user.id,
      keyword: searchKeyword
    });
    if (result.error) {
      return setError(result);
    }

    setChannels(result.channels);
  }

  async function joinChannel(channelId) {
    const { error, channel } = await channels.joinChannel(channelId, user.id);
    if (error) {
      return setError(error);
    }

    onChannelJoin(channel);
    history.push({
      pathname: `channels/${channelId}`,
      state: {
        title: channel.name
      }
    });
  }
}

export default Dashboard;

// Helpers ***************************
function canUserJoin(userId, channel) {
  return userId !== channel.ownerId && !channel.members.includes(userId);
}
