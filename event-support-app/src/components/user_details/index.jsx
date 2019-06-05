import axios from "axios";
import React from "react";
import { Col, FormControl, ListGroupItem, Row } from "react-bootstrap";
import "./style.css";

export default class UserDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: 1,
        name: "Krzysiek",
        surname: "Nowak",
        email: "krzysztof@mail.com",
        address: "Wrocław, Plac Grunwaldzki"
      }
    };
  }

  componentDidMount() {
    this.getAllMembers();
    // this.getMemberDetails();
  }

  getAllMembers() {
    const token = localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: token
      }
    };

    axios.get("/users/" + this.props.id, config).then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <div id="UserDetails">
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">ID: </b>
              <FormControl
                placeholder={this.state.user ? this.state.user.id : null}
              />
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Imię: </b>
              <FormControl
                placeholder={this.state.user ? this.state.user.name : null}
              />
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Ksywka: </b>
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Adres: </b>
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Email: </b>
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Status: </b>
              dostępny
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Wolne weekendy: </b>
              Tak
            </ListGroupItem>
          </Col>
        </Row>

        <h2>Szczegóły o samochodzie:</h2>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Model: </b>
              Opel Astra Kombi
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Spalanie: </b>
              7l benzyny / 100km
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Ilość miejsc: </b>5
            </ListGroupItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroupItem>
              <b className="detailsHeader">Ilość miejsca na bagaż: </b>7
              średnich
            </ListGroupItem>
          </Col>
        </Row>
      </div>
    );
  }
}
