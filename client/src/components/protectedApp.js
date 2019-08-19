import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Drawer from './drawer';
import Navigation from './navigation';
import Dashboard from './dashboard';
import ChannelForm from './channelForm';
import Channel from './channel';
import { channels } from '../services/api';

import './protectedApp.css';

function ProtectedApp({ user, pathname }) {
  const [userChannels, setChannels] = useState([]);
  const [pageTitle, setPageTitle] = useState([]);
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
        pathname={pathname}
        toggleDrawer={toggleDrawer}
        isOpen={open}
      />
      <div className="tab">
        <Navigation toggleDrawer={toggleDrawer} pageTitle={pageTitle} />

        <Route
          path="/dashboard"
          render={({ history }) => (
            <Dashboard
              history={history}
              user={user}
              onChannelJoin={addChannel}
              setTitle={title => setPageTitle(title)}
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
                setTitle={title => setPageTitle(title)}
              />
            )}
          />
          <Route
            path="/channels/:id"
            render={routeParams => (
              <Channel
                user={user}
                routeParams={routeParams}
                setTitle={title => setPageTitle(title)}
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
