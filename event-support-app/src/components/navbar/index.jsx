import React from "react";
import { Navbar, Nav, NavDropdown, FormGroup } from "react-bootstrap";
import { FormControl, Button, Form, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default class HomeNavbar extends React.Component {
  checkAuth = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
      return <b style={{ color: "green" }}>Zalogowany</b>;
    } else {
      return <b style={{ color: "red" }}>Niezalogowany</b>;
    }
  };

  logOut = () => {
    console.log("infoWylogowany");
    localStorage.clear();
    // window.location.reload();
    this.forceUpdate();
  };

  renderProperInformations = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
      return (
        <Container id="userLogged">
          <Form>
            <Form.Group>KRzysiek</Form.Group>

            <Form.Group>krzysztof@mail.com</Form.Group>
            <Button onClick={this.logOut} variant="outline-info">
              Wyloguj się
            </Button>
          </Form>
        </Container>
      );
    } else {
      return (
        <div>
          <Container id="userProperties">
            <Form>
              {/* <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Nazwa użytkownika"
                  className="mr-sm-2"
                />
              </Form.Group>

              <Form.Group>
                <FormControl
                  type="password"
                  placeholder="Hasło"
                  className="mr-sm-2"
                />
              </Form.Group> */}
              <Button href="/login" variant="outline-info">
                Zaloguj się
              </Button>
            </Form>
          </Container>
          <NavDropdown.Item href="/register">
            <b>Zarejestruj się</b>
          </NavDropdown.Item>
        </div>
      );
    }
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/events">Wydarzenia</Nav.Link>
          <Nav.Link href="/members">Lista użytkowników</Nav.Link>
          <Nav.Link href="/addEvent">Dodaj nowe wydarzenie</Nav.Link>
          <Nav.Link>{this.checkAuth()}</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            title={<FontAwesomeIcon size="lg" icon={faSignInAlt} />}
            id="collasible-nav-dropdown"
            alignRight
          >
            {this.renderProperInformations()}
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
