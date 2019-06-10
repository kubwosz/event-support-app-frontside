import axios from "axios";
import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Jumbotron,
  Overlay,
  Tooltip
} from "react-bootstrap";
import CarDetails from "../car_details/index";
import "./style.css";

export default class RegisterPage extends React.Component {
  constructor(...args) {
    super(...args);

    this.attachRefPass = targetPass => this.setState({ targetPass });
    this.attachRefUser = targetUser => this.setState({ targetUser });
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      address: "",
      showTooltipPass: false,
      showTooltipUser: false,
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

  onChangeUsername = e => {
    var config = {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrc2EiLCJleHAiOjE1NTk5OTY2NTF9.RNfud2FaOCsV9yy55pec1IrUAAjN6DJhxyoA3w4T1fkc50jGXb6z4WSTuh4-Q3OMleizqAV_bWGyxhbxjG0Krg"
      },
      params: {
        username: e.target.value
      }
    };
    axios
      .get("/users/search/findByUsername", config)
      .then(res => {
        this.setState({
          showTooltipUser: true
        });
      })
      .catch(err => {
        {
          this.setState({
            showTooltipUser: false
          });
        }
        console.log("error:");
        console.log(err);
      });
    this.setState({ username: e.target.value });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  onChangeCar = val => {
    let tmp = val.target.value === "Tak" ? true : false;
    this.setState({ haveCar: tmp });
  };

  passwordValidation = () => {
    this.setState({
      showTooltipPass: this.state.password !== this.state.password2
    });
  };

  registerUser = () => {
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
        console.log(err);
        if (err.toString().includes("409")) {
          window.confirm("Istnieje użytkownik o takiej ksywie!");
        } else {
          window.confirm(err);
        }
      });
  };

  handleSubmit(event) {
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
      showTooltipPass,
      showTooltipUser,
      targetPass,
      targetUser,
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
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Ksywa</Form.Label>
                <Form.Control
                  required
                  name="username"
                  placeholder="Ksywa"
                  onChange={this.onChange}
                  ref={this.attachRefUser}
                />
                <Overlay
                  target={targetUser}
                  show={showTooltipUser}
                  placement="right"
                >
                  {props => (
                    <Tooltip id="overlay-example" {...props}>
                      Istnieje już taka ksywa w systemie
                    </Tooltip>
                  )}
                </Overlay>
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
                  onBlur={this.passwordValidation}
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
                  ref={this.attachRefPass}
                />
                <Overlay
                  target={targetPass}
                  show={showTooltipPass}
                  placement="right"
                >
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
                <Form.Label>Status</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  id="Current_state"
                  as="select"
                >
                  <option>Rekrut</option>
                  <option>Członek</option>
                  <option>EAS</option>
                  <option>Zewnętrzny</option>
                </Form.Control>
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
                disabled={showTooltipPass || showTooltipUser}
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
