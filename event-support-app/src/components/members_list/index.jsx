import React from "react";
import { Container, Row, Col, ListGroupItem } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";
import axios from "axios";

class MembersList extends React.Component {
  constructor() {
    super();
    this.state = {
      members: [
        {
          id: 1,
          name: "Krzysiek",
          surname: "Nowak",
          email: "krzysztof@mail.com",
          address: "Wrocław, Plac Grunwaldzki"
        }
        // {
        //   id: 2,
        //   name: "Łysy",
        //   surname: "Nowak",
        //   email: "lysegomail@mail.com",
        //   address: "Warszawa, Plac Zbawiciela"
        // },
        // {
        //   id: 3,
        //   name: "Bombardier",
        //   surname: "Nowak",
        //   email: "sample2@mail.com",
        //   address: "Poznań, Marszałkowska"
        // },
        // {
        //   id: 4,
        //   name: "Czołg",
        //   surname: "Nowak",
        //   email: "sample2@mail.com",
        //   address: "Wrocław, Plac Grunwaldzki"
        // }
      ],
      activeMemberId: 0
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

    axios.get("/users", config).then(res => {
      console.log(res);
      this.setState({
        members: res.data._embedded.users
      });
    });
  }

  renderItem(member, index) {
    return (
      <a href={"#" + (index + 1)}>
        <Row
          key={index}
          onClick={() => {
            this.setState({
              activeMemberId: member.id
            });
          }}
        >
          <Col>
            <ListGroupItem>{member.username}</ListGroupItem>
          </Col>
        </Row>
      </a>
    );
  }

  render() {
    const activeMemberId = this.state.activeMemberId - 1;

    const members = _.map(this.state.members, (member, k) => {
      return this.renderItem(member, k);
    });

    return (
      <div id="Page">
        <div id="Members">
          <h1>Lista użytkowników:</h1>
          {members}
        </div>
        <div
          className="memberDetails"
          style={{
            visibility: this.state.activeMemberId ? "visible" : "hidden"
          }}
        >
          <h2>Szczegóły o użytkowniku:</h2>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">ID: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].id
                  : null}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Imię: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].name
                  : null}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Ksywka: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].name
                  : null}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Adres: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].address
                  : null}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Email: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].email
                  : null}
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
      </div>
    );
  }
}

export default withRouter(MembersList);
