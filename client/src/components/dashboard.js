import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { channels } from '../services/api';

import './dashboard.css';

function Dashboard({ history, user, onChannelJoin }) {
  const [fetchedChannels, setChannels] = useState(undefined);
  const [joinedChannel, setChannel] = useState(undefined);
  const [searchKeyword, setKeyword] = useState('');
  const [error, setError] = useState(null);

  function isChannelMember(channel) {
    const userId = props.user.id;
    return channel.members.includes(userId);
  }

  function isChannelOwner(channel) {
    const userId = props.user.id;
    return channel.ownerId === userId;
  }

  async function joinChannel(event) {
    const channelId = event.target.id;
    const userId = props.user.id;
    const result = await channels.joinChannel(channelId, userId);
    const channel = result.data;
    setChannel(channel);
  }

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
        <Link className="createLink" to="/channels/new">
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
                  <td>
                    {!isChannelMember(channel) && !isChannelOwner(channel) ? (
                      <button
                        className="btn btn-info"
                        id={channel._id}
                        onClick={joinChannel}
                      >
                        join channel
                      </button>
                    ) : !isChannelOwner(channel) && isChannelMember(channel) ? (
                      <button className="btn btn-danger">leave channel</button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      {joinedChannel ? (
        <Redirect to={`/channels/${joinedChannel.name}`} />
      ) : null}
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
    history.push(`channels/${channelId}`);
  }
}

export default Dashboard;
