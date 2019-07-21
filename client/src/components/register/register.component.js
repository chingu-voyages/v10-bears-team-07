import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './register.style.css';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }
  handleForm(e) {
    e.preventDefault();
    const credentials = {
      username: this.refs.inputUsername.value,
      email: this.refs.inputEmail.value,
      password: this.refs.inputPassword.value
    };
    this.props.handleForm(credentials);
  }

  handleUsername() {
    this.props.handleUsername(this.refs.inputUsername);
  }

  handlePassword() {
    this.props.handlePassword(this.refs.inputPassword);
  }

  handleEmail() {
    this.props.handleEmail(this.refs.inputEmail);
  }

  formIsValid() {
    return (
      this.props.usernameBorderStyle == 'greenBorder' &&
      this.props.emailBorderStyle == 'greenBorder' &&
      this.props.passwordBorderStyle == 'greenBorder'
    );
  }

  render() {
    return (
      <div>
        <Container className="mt-5">
          <p className="text-center mb-2">
            Please register for free and start using the app
          </p>
          {this.props.success ? (
            <p className="text-success feedback">{this.props.message}</p>
          ) : null}
          {!this.props.success && !this.props.field ? (
            <p className="text-danger feedback"> {this.props.message}</p>
          ) : null}
          <Card>
            <Card.Body>
              <Form onSubmit={this.handleForm} ref="formRef" noValidate>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    className={this.props.usernameBorderStyle}
                    placeholder="Enter Username"
                    ref="inputUsername"
                    onChange={this.handleUsername}
                    minLength="3"
                    required
                  />
                  <Form.Text className="text-danger">
                    {this.props.field && this.props.field === 'username'
                      ? this.props.message
                      : null}
                    {this.props.usernameErrorMessage}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref="inputEmail"
                    className={this.props.emailBorderStyle}
                    onChange={this.handleEmail}
                    required
                  />
                  <Form.Text className="text-danger">
                    {this.props.field && this.props.field === 'email'
                      ? this.props.message
                      : null}
                    {this.props.emailErrorMessage}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className={this.props.passwordBorderStyle}
                    placeholder="Enter your password"
                    ref="inputPassword"
                    onChange={this.handlePassword}
                    minLength="8"
                    required
                  />
                  <Form.Text className="text-danger">
                    {this.props.passwordErrorMessage}
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
          <div>
            <p>
              Already registerd ? Please <Link to="/login">log in</Link>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}
