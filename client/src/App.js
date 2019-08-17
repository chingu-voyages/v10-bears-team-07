import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ProtectedApp from './components/protectedApp';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import { auth } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getCachedUser() {
      const { user } = await auth.getCachedUser();
      setUser(user);
    }

    getCachedUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
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
            user ? (
              <Redirect to="/dashboard" />
            ) : (
              <Register onSubmit={setUser} />
            )
          }
        />
        {/* Needs to come after the other routes */}
        <Route
          path="/"
          render={({ location }) =>
            !user ? (
              <Redirect to="/login" />
            ) : (
              <ProtectedApp pathname={location.pathname} user={user} />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
