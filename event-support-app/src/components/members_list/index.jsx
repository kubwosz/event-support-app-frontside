import React from "react";
import { Container, Row, Col, ListGroupItem } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";

class MembersList extends React.Component {
  constructor() {
    super();
    this.state = {
      members: [
        {
          id: 1,
          name: "Krzys1",
          surname: "Nowak",
          email: "sample2@mail.com",
          address: "Wrocław, Plac Grunwaldzki"
        },
        {
          id: 2,
          name: "Krzys2",
          surname: "Nowak",
          email: "sample2@mail.com",
          address: "Wrocław, Plac Grunwaldzki"
        },
        {
          id: 3,
          name: "Krzys3",
          surname: "Nowak",
          email: "sample2@mail.com",
          address: "Wrocław, Plac Grunwaldzki"
        },
        {
          id: 4,
          name: "Krzys4",
          surname: "Nowak",
          email: "sample2@mail.com",
          address: "Wrocław, Plac Grunwaldzki"
        }
      ],
      activeMemberId: 0
    };
  }

  componentDidMount() {
    this.getAllMembers();
    // this.getMemberDetails();
  }

  getAllMembers() {
    // this.setState({
    // });
  }

  renderItem(member, index) {
    return (
      <Row
        key={index}
        onClick={() => {
          this.setState({
            activeMemberId: member.id
          });
        }}
      >
        <Col>
          <ListGroupItem>{member.name}</ListGroupItem>
        </Col>
      </Row>
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
          id="MemberDetails"
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
                  ? this.state.members[activeMemberId].name
                  : null}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Email: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].name
                  : null}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Status: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].name
                  : null}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Wolne weekendy: </b>
                {this.state.members[activeMemberId]
                  ? this.state.members[activeMemberId].name
                  : null}
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
