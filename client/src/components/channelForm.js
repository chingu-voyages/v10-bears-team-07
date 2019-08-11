import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { channels } from '../services/api';

import './login.css';

function ChannelForm({ history, user, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="login">
      <div className="login__inner">
        <header>
          <h2 className="login__title">Create a new Channel</h2>
          {error && <p className="login__error">An error occured: {error}</p>}
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Channel Name</label>
            <input
              onChange={e => {
                setName(e.target.value);
              }}
              value={name}
              type="text"
              name="name"
              id="name"
              minLength="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Channel Description</label>
            <input
              onChange={e => {
                setDescription(e.target.value);
              }}
              value={description}
              type="text"
              name="description"
              id="description"
              maxLength="150"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Comma separated Tags</label>
            <input
              onChange={e => {
                setTags(e.target.value);
              }}
              value={tags}
              type="text"
              name="tags"
              id="tags"
            />
          </div>
          <button disabled={loading} type="submit">
            Create Channel
          </button>
        </form>
      </div>
    </div>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const { error, channel } = await channels.createChannel({
      name,
      description,
      tags,
      ownerId: user.id
    });

    if (error) {
      setLoading(false);
      return setError(error);
    }

    onSubmit(channel);
    history.push(`/${channel.name}`);
  }
}

export default withRouter(ChannelForm);
