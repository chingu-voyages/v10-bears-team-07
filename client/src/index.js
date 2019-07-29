import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Dashboard } from './components/dashboard/dashboard.component.js';
import { Login } from './components/login/login.component.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Route path="/register" component={App} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/login" component={Login} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
