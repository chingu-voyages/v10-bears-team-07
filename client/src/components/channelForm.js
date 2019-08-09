import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { channels } from '../services/api';

import './login.css';

function ChannelForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [channel, setChannel] = useState('');
  const [ownerId, setOwnerId] = useState(window.localStorage.getItem('id'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="login">
      <div className="login__inner">
        <header>
          <h2 className="login__title">New Channel</h2>
          {error && <p className="login__error">An error occured: {error}</p>}
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Channel Name</label>
            <input
              onBlur={e => setName(e.target.value)}
              type="text"
              name="channelName"
              id="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Channel Tags</label>
            <input
              onBlur={e => setTags(e.target.value.split(','))}
              type="text"
              name="channelTags"
              id="tags"
              placeholder="Add some tags separated by commas"
              required
            />
          </div>

          <button disabled={loading} type="submit">
            Create Channel
          </button>
        </form>
      </div>
      {channel ? <Redirect to="/dashboard" /> : null}
    </div>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const ownerId = window.localStorage.getItem('id');
    const { message, savedChannel } = await channels.createChannel({
      name,
      tags,
      ownerId
    });
    setChannel(savedChannel);
  }
}

export default ChannelForm;
