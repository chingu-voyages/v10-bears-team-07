import React, { Component } from 'react';
import './App.css';
import { Register } from './components/register/register.component.js';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      message: ''
    };
    this.handleForm = this.handleForm.bind(this);
  }
  handleForm(credentials) {
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `username=${credentials.username}&email=${credentials.email}&password=${credentials.password}`
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          success: data.success,
          message: data.message
        })
      )
      .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <Register message={this.state.message} handleForm={this.handleForm} />
      </div>
    );
  }
}
