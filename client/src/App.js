import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard';
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
      <Route
        exact
        path="/"
        render={() => {
          if (!user) {
            return (
              <p>
                <Link to="/login">Sign in</Link> or{' '}
                <Link to="/register">Register</Link>
              </p>
            );
          }
          return <Redirect to="/dashboard" />;
        }}
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
        render={() => (!user ? <Redirect to="/login" /> : <Dashboard />)}
      />
    </BrowserRouter>
  );
}

export default App;
