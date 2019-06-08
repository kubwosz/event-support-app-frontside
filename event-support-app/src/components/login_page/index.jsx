import axios from "axios";
import React from "react";
import { Button, Container, Form, Jumbotron } from "react-bootstrap";

export default class LoginPage extends React.Component {
  constructor(...args) {
    super(...args);

    this.attachRef = target => this.setState({ target });
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  logInUser = () => {
    axios
      .post("/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.setItem("token", response.headers.authorization);
        this.props.history.push("/events");
      })
      .catch(err => {
        window.confirm(err);
      });
  };

  render() {
    return (
      <div style={{ width: "40%", margin: "auto" }}>
        <Jumbotron fluid>
          <Container>
            <h1>Zaloguj się:</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nazwa użytkownika:</Form.Label>
                <Form.Control
                  required
                  name="username"
                  type="text"
                  placeholder="Nazwa użytkownika"
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło:</Form.Label>
                <Form.Control
                  required
                  name="password"
                  type="password"
                  placeholder="Hasło"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Zapamiętaj" />
              </Form.Group>
              <Button variant="primary" onClick={this.logInUser}>
                Zaloguj
              </Button>
            </Form>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
