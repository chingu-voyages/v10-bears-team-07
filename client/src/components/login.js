import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/api';

import './login.css';

function Login({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="login">
      <div className="login__inner">
        <header>
          <h2 className="login__title">Welcome back !</h2>
          <p className="login__welcome">We're happy to see you again :)</p>
          {error && <p className="login__error">An error occured: {error}</p>}
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
            />
          </div>

          <button>Sign In</button>
          <p className="login__redirect">
            Need an account ? <Link to="/register">Register</Link> instead
          </p>
        </form>
      </div>
    </div>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const { error, user } = await auth.login({ email, password });

    if (error) {
      return setError(error);
    }
    onSubmit(user);
  }
}

export default Login;
