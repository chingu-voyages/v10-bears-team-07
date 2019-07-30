import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
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
}

export default Login;
