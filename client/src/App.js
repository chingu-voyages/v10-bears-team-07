import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './App.css';
import { Register } from './components/register/register.component.js';
import * as EmailValidator from 'email-validator';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      message: null,
      field: null,
      username: null,
      usernameBorderStyle: null,
      emailBorderStyle: null,
      passwordBorderStyle: null,
      usernameErrorMessage: null,
      passwordErrorMessage: null,
      emailErrorMessage: null
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(input) {
    this.setState({
      usernameBorderStyle: input.checkValidity() ? 'greenBorder' : 'redBorder',
      usernameErrorMessage: input.validity.valueMissing
        ? 'The username is required'
        : input.value.length < 3
        ? 'Your username is too short. It must contain at least 3 characters'
        : null
    });
  }

  handleEmail(input) {
    this.setState({
      emailBorderStyle: EmailValidator.validate(input.value)
        ? 'greenBorder'
        : 'redBorder',
      emailErrorMessage: input.validity.valueMissing
        ? 'The email address is required'
        : !EmailValidator.validate(input.value)
        ? `${input.value} is not a valid email address`
        : null
    });
  }

  handlePassword(input) {
    this.setState({
      passwordBorderStyle:
        input.value && input.value.length >= 8 ? 'greenBorder' : 'redBorder',
      passwordErrorMessage: input.validity.valueMissing
        ? 'The password is required'
        : input.value.length < 8
        ? 'Your password is too short. It must contain at least 8 characters'
        : null
    });
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
      .then(async data => {
        await this.setState({
          success: data.success,
          message: data.message,
          field: data.field ? data.field : null,
          username: data.success ? credentials.username : null
        });
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <Register
          handleUsername={this.handleUsername}
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          usernameBorderStyle={this.state.usernameBorderStyle}
          emailBorderStyle={this.state.emailBorderStyle}
          passwordBorderStyle={this.state.passwordBorderStyle}
          usernameErrorMessage={this.state.usernameErrorMessage}
          passwordErrorMessage={this.state.passwordErrorMessage}
          emailErrorMessage={this.state.emailErrorMessage}
          message={this.state.message}
          success={this.state.success}
          handleForm={this.handleForm}
          field={this.state.field}
        />
        {this.state.success ? <Redirect to="/dashboard" /> : null}; }
      </div>
    );
  }
}
