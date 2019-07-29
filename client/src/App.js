import React, { Component } from 'react';
import './App.css';
import { Register } from './components/register/register.component.js';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Register />
      </div>
    );
  }
}
