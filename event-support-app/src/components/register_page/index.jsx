import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { Form, Button, Col } from "react-bootstrap";
import { Overlay, Tooltip } from "react-bootstrap";
import "./style.css";

export default class RegisterPage extends React.Component {
  constructor(...args) {
    super(...args);

    this.attachRef = target => this.setState({ target });
    this.state = {
      password: "",
      password2: "",
      isPasswordCorrect: true,
      show: false
    };
  }

  onChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    //handle form processing here....
  };

  passwordValidation = () => {
    console.log(this.state.password);
    console.log(this.state.password2);

    this.setState(
      {
        isPasswordCorrect: this.state.password === this.state.password2
      },
      () => {
        this.setState({ show: !this.state.isPasswordCorrect });
        console.log(this.state.show);
        console.log(this.state.password);
        console.log(this.state.password2);
      }
    );

    console.log(this.state.password);
    console.log(this.state.password2);
    console.log(this.state.isPasswordCorrect);
    console.log(this.state.password === this.state.password2);
  };

  render() {
    const { password, password2, show, target, isPasswordCorrect } = this.state;

    return (
      <Container className="Container">
        <Jumbotron fluid>
          <Container>
            <h1>Zarejestruj się:</h1>

            <Form>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Imię</Form.Label>
                <Form.Control placeholder="Imię" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control placeholder="Nazwisko" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridNickname">
                <Form.Label>Ksywa</Form.Label>
                <Form.Control required placeholder="Ksywa" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  required
                  name="password"
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword2">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control
                  required
                  name="password2"
                  type="password"
                  placeholder="Powtórz hasło"
                  value={password2}
                  onChange={this.onChange}
                  onBlur={this.passwordValidation}
                  ref={this.attachRef}
                />
                <Overlay target={target} show={show} placement="right">
                  {props => (
                    <Tooltip id="overlay-example" {...props}>
                      Hasła nie są identyczne
                    </Tooltip>
                  )}
                </Overlay>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Adres</Form.Label>
                <Form.Control placeholder="Pełny adres" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Czy posiadasz auto?</Form.Label>
                <Form.Control id="CarControl" as="select">
                  <option>Nie</option>
                  <option>Tak</option>
                </Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={!isPasswordCorrect}
              >
                Zarejestruj
              </Button>
            </Form>
          </Container>
        </Jumbotron>
      </Container>
    );
  }
}
