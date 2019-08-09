import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ChannelForm from './components/channelForm';
import { auth, channels } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [userChannels, setChannels] = useState([]);

  // Temporarily add code to fetch channels inside getCached user
  // has a number of side effects, like making another request after
  // register or login is called.
  // TODO: move this code to drawer parent together with ChannelForm
  useEffect(() => {
    async function getCachedUser() {
      if (!user) {
        const { user } = await auth.getCachedUser();
        setUser(user);
      } else {
        const { channels: userChannels } = await channels.getUserChannels(
          user.id
        );
        setChannels(userChannels);
      }
    }

    getCachedUser();
  }, [user]);

  return (
    <BrowserRouter>
      <Route
        exact
        path="/"
        render={() => <Home isLoggedIn={Boolean(user)} />}
      />
      <Route
        path="/login"
        render={() =>
          user ? <Redirect to="/dashboard" /> : <Login onSubmit={setUser} />
        }
      />
      <Route
        path="/register"
        render={() =>
          user ? <Redirect to="/dashboard" /> : <Register onSubmit={setUser} />
        }
      />
      <Route
        path="/dashboard"
        render={() =>
          !user ? (
            <Redirect to="/login" />
          ) : (
            <Dashboard channels={userChannels} onClick={setUser} />
          )
        }
      />
      {/* TODO: move this code to drawer parent together with ChannelForm */}
      <Route
        path="/channel/new"
        render={() =>
          !user ? (
            <Redirect to="/login" />
          ) : (
            <ChannelForm
              user={user}
              onSubmit={channel => {
                setChannels([...userChannels, channel]);
              }}
            />
          )
        }
      />
    </BrowserRouter>
  );
}

export default App;
