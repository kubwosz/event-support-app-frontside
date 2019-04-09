import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { FormControl, Button, Form } from "react-bootstrap";

export default class HomeNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/events">Wydarzenia</Nav.Link>
          <Nav.Link href="/members">Lista użytkowników</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Szukaj" className="mr-sm-2" />
          <Button variant="outline-info">Szukaj</Button>
        </Form>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#">
              <span class="glyphicon glyphicon-user" /> Zarejestruj się
            </a>
          </li>
          <li>
            <a href="#">
              <span class="glyphicon glyphicon-log-in" /> Zaloguj się
            </a>
          </li>
        </ul>
      </Navbar>
    );
  }
}
