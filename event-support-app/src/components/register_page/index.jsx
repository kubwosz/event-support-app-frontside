import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { Form, Button, Col } from "react-bootstrap";
import { Overlay, Tooltip } from "react-bootstrap";
import "./style.css";
import axios from "axios";
import CarDetails from "../car_details/index";

export default class RegisterPage extends React.Component {
  constructor(...args) {
    super(...args);

    this.attachRef = target => this.setState({ target });
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      isPasswordCorrect: true,
      address: "",
      show: false,
      haveCar: false,
      formValidated: false,
      model: "",
      combustion: 0,
      peopleCapacity: 0,
      cargoCapacity: 0
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCar = val => {
    let tmp = val.target.value == "Tak" ? true : false;
    this.setState({ haveCar: tmp });
  };

  passwordValidation = () => {
    this.setState(
      {
        isPasswordCorrect: this.state.password === this.state.password2
      },
      () => {
        this.setState({ show: !this.state.isPasswordCorrect });
      }
    );
  };

  registerUser = () => {
    console.log(this.state);
    axios
      .post("/signup", {
        username: this.state.username,
        address: this.state.address,
        email: this.state.email,
        password: this.state.password,
        vehicle: this.state.haveCar
      })
      .then(() => {
        window.confirm("Użytkownik zarejestrowany pomyślnie");
        this.props.history.push("/login/");
      })
      .catch(err => {
        window.confirm(err);
      });
  };

  handleSubmit(event) {
    console.log("too");
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      this.registerUser();
    }
    event.preventDefault();
    event.stopPropagation();
    this.setState({ formValidated: true });
  }

  render() {
    const {
      password,
      password2,
      show,
      target,
      isPasswordCorrect,
      formValidated
    } = this.state;

    return (
      <Container className="Container">
        <Jumbotron fluid>
          <Container>
            <h1>Zarejestruj się:</h1>

            <Form
              noValidate
              validated={formValidated}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Imię</Form.Label>
                <Form.Control placeholder="Imię" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control placeholder="Nazwisko" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Ksywa</Form.Label>
                <Form.Control
                  required
                  name="username"
                  placeholder="Ksywa"
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.onChange}
                />
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
                <Form.Control
                  required
                  name="address"
                  placeholder="Pełny adres"
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Czy posiadasz auto?</Form.Label>
                <Form.Control
                  onChange={this.onChangeCar}
                  id="CarControl"
                  as="select"
                >
                  <option>Nie</option>
                  <option>Tak</option>
                </Form.Control>
              </Form.Group>
              {this.state.haveCar ? <CarDetails /> : null}
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
