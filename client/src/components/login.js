import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/api';

function Login({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>An error occured: {error}</p>}

      <label htmlFor="email">Email Address</label>
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="email"
        name="email"
        id="email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        name="password"
        id="password"
        required
      />

      <button type="submit">Login</button>
      <Link to="/register">Register instead</Link>
    </form>
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
