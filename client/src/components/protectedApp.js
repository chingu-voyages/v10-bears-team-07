import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Drawer from './drawer';
import Navigation from './navigation';
import Dashboard from './dashboard';
import ChannelForm from './channelForm';
import Channel from './channel';
import { channels } from '../services/api';

import './protectedApp.css';

function ProtectedApp({ user }) {
  const [userChannels, setChannels] = useState([]);
  useEffect(() => {
    channels.getUserChannels(user.id).then(data => {
      setChannels(data.channels);
    });
  }, [user]);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="app">
      <Drawer
        channels={userChannels}
        toggleDrawer={toggleDrawer}
        isOpen={open}
      />
      <div className="tab">
        <Navigation toggleDrawer={toggleDrawer} />

        <Route
          path="/dashboard"
          render={({ history }) => (
            <Dashboard
              history={history}
              user={user}
              onChannelJoin={addChannel}
            />
          )}
        />
        <Switch>
          <Route
            path="/channels/new"
            render={() => (
              <ChannelForm
                user={user}
                onSubmit={channel => {
                  setChannels([...userChannels, channel]);
                }}
              />
            )}
          />
          <Route
            path="/channels/:id"
            render={({ match }) => (
              <Channel
                channel={userChannels.find(
                  ({ _id }) => _id === match.params.id
                )}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );

  function addChannel(channel) {
    setChannels([...userChannels, channel]);
  }
}

export default ProtectedApp;
