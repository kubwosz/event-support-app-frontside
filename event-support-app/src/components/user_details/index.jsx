import axios from "axios";
import React from "react";
import { Col, FormControl, ListGroupItem, Row, Button } from "react-bootstrap";
import CarDetails from "../car_details/index";
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
      },
      car: {}
    };
  }

  componentDidMount() {
    this.getMember();
    // this.getCarInfo();
    // this.getMemberDetails();
  }

  getMember() {
    const token = localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: token
      },
      params: {
        id: localStorage.getItem("userId")
      }
    };

    axios
      .get("/userdetails", config)
      .then(res => {
        this.setState({
          user: res.data
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let carr = () => {
      this.setState({ car: "" });
    };
    return (
      <div id="UserDetailsPage">
        <div id="UserDetails">
          <h2>Szczegóły o użytkowniku:</h2>
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
                <b className="detailsHeader">Ksywka: </b>
                <FormControl
                  placeholder={
                    this.state.user ? this.state.user.username : null
                  }
                />
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Adres: </b>
                <FormControl
                  placeholder={this.state.user ? this.state.user.address : null}
                />
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Email: </b>
                <FormControl
                  placeholder={this.state.user ? this.state.user.email : null}
                />
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
        </div>
        <div id="CarDetails">
          <h2>Szczegóły o samochodzie:</h2>
          <CarDetails car={this.state.car} />
        </div>
      </div>
    );
  }
}
