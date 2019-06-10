import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./style.css";
import decode from "jwt-decode";

class HomeNavbar extends React.Component {
  checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      const tokenDecoded = decode(token); //sub exp
      this.getUserId(token, tokenDecoded.sub);

      if (token !== null) {
        return <b style={{ color: "green" }}>Zalogowany</b>;
      } else {
        return <b style={{ color: "red" }}>Niezalogowany</b>;
      }
    }
  };

  getUserId(token, username) {
    var config = {
      headers: {
        Authorization: token
      },
      params: {
        username: username
      }
    };
    axios
      .get("/users/search/findByUsername", config)
      .then(res => {
        let urlWithId = res.data._links.self.href;
        var result = /[^/]*$/.exec(urlWithId)[0];

        localStorage.setItem("userId", result);
      })
      .catch(err => {
        console.log("error2:");
        console.log(err);
      });
  }

  checkIfEndpointResponses(token) {
    if (token != null) {
      var config = {
        headers: {
          Authorization: token
        }
      };

      axios
        .get("/users", config)
        .then(res => {
          return true;
        })
        .catch(err => {
          console.log("removing token...");
          localStorage.removeItem("token");
          return false;
        });
    } else {
      return false;
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (
      token === null &&
      this.props.history.location.pathname !== "/register"
    ) {
      this.props.history.push("/login");
    }
  }

  logOut = () => {
    console.log("infoWylogowany");
    localStorage.clear();
    // window.location.reload();
    this.forceUpdate();
  };

  renderUserInformations = () => {
    const token = localStorage.getItem("token");
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
        <div className="navbar">
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
              <Button
                id="navDropdownButton"
                href="/login"
                variant="outline-info"
              >
                Zaloguj się
              </Button>
              <a id="registerLink" href="/register">
                Zarejestruj się
              </a>
            </Form>
          </Container>
          {/* <NavDropdown.Item href="/register">
            <b>Zarejestruj się</b>
          </NavDropdown.Item> */}
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
            {this.renderUserInformations()}
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
export default withRouter(HomeNavbar);
