import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
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

  render() {
    return (
      <div>
        <Container className="mt-5">
          <p className="text-center mb-2">
            Please register for free and start using the app
          </p>
          <h2>{this.props.message}</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={this.handleForm}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    ref="inputUsername"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref="inputEmail"
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref="inputPassword"
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
