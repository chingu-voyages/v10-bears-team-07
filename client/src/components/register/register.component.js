import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import * as EmailValidator from 'email-validator';
import './register.style.css';

export class Register extends Component {
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
    this.formIsValid = this.formIsValid.bind(this);
  }
  abortController = new AbortController();

  handleForm(e) {
    e.preventDefault();
    const credentials = {
      username: e.target.childNodes[0].children[1].value,
      email: e.target.childNodes[1].children[1].value,
      password: e.target.childNodes[2].children[1].value
    };
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `username=${credentials.username}&email=${credentials.email}&password=${credentials.password}`,
      signal: this.abortController.signal
    })
      .then(response => {
        this.setState({
          success: response.ok
        });
        return response.json();
      })
      .then(data => {
        this.setState({
          message: data.message,
          field: data.field ? data.field : null,
          username: this.state.success ? credentials.username : null
        });
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        console.error(err);
      });
  }

  handleUsername(e) {
    const input = e.target;
    this.setState({
      usernameBorderStyle: input.checkValidity() ? 'greenBorder' : 'redBorder',
      usernameErrorMessage: input.validity.valueMissing
        ? 'The username is required'
        : input.value.length < 3
        ? 'Your username is too short. It must contain at least 3 characters'
        : null
    });
  }

  handlePassword(e) {
    const input = e.target;
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

  handleEmail(e) {
    const input = e.target;
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

  formIsValid() {
    return (
      this.state.usernameBorderStyle === 'greenBorder' &&
      this.state.emailBorderStyle === 'greenBorder' &&
      this.state.passwordBorderStyle === 'greenBorder'
    );
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return (
      <div>
        <Container className="mt-5">
          <p className="text-center mb-2">
            Please register for free and start using the app
          </p>
          {this.state.success ? (
            <p className="text-success feedback">{this.state.message}</p>
          ) : null}
          {!this.state.success && !this.state.field ? (
            <p className="text-danger feedback"> {this.state.message}</p>
          ) : null}
          <Card>
            <Card.Body>
              <Form onSubmit={this.handleForm} ref="formRef" noValidate>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    className={this.state.usernameBorderStyle}
                    placeholder="Enter Username"
                    onChange={this.handleUsername}
                    minLength="3"
                    required
                  />
                  <Form.Text className="text-danger">
                    {this.state.field && this.state.field === 'username'
                      ? this.state.message
                      : null}
                    {this.state.usernameErrorMessage}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className={this.state.emailBorderStyle}
                    onChange={this.handleEmail}
                    required
                  />
                  <Form.Text className="text-danger">
                    {this.state.field && this.state.field === 'email'
                      ? this.state.message
                      : null}
                    {this.state.emailErrorMessage}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className={this.state.passwordBorderStyle}
                    placeholder="Enter your password"
                    onChange={this.handlePassword}
                    minLength="8"
                    required
                  />
                  <Form.Text className="text-danger">
                    {this.state.passwordErrorMessage}
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  disabled={!this.formIsValid()}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        {this.state.success ? <Redirect to="/dashboard" /> : null}
      </div>
    );
  }
}
