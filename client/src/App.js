import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard';
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
          !user ? <Redirect to="/login" /> : <Dashboard onClick={setUser} />
        }
      />
    </BrowserRouter>
  );
}

export default App;
