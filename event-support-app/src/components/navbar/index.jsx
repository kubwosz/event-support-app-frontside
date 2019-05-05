import React from "react";
import { Navbar, Nav, NavDropdown, FormGroup } from "react-bootstrap";
import { FormControl, Button, Form, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default class HomeNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/events">Wydarzenia</Nav.Link>
          <Nav.Link href="/members">Lista użytkowników</Nav.Link>
          <Nav.Link href="/addEvent">Dodaj nowe wydarzenie</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            title={<FontAwesomeIcon size="lg" icon={faSignInAlt} />}
            id="collasible-nav-dropdown"
            alignRight
          >
            <Container id="userProperties">
              <Form>
                <Form.Group>
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
                </Form.Group>
                <Button variant="outline-info">Zaloguj się</Button>
              </Form>
            </Container>
            <NavDropdown.Item href="/register">
              <b>Zarejestruj się</b>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
