import React from "react";
import { Container, Row, Col, ListGroupItem } from "react-bootstrap";
import _ from "lodash";
import "./style.css";
import MembersList from "../members_list/index";

export default class MemberDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      member: {
        id: 5,
        name: "Adam",
        surname: "Kowalski",
        email: "sample@mail.com",
        address: "Wrocław, Plac Grunwaldzki"
      },
      member2: {
        id: 1,
        name: "Krzys",
        surname: "Nowak",
        email: "sample2@mail.com",
        address: "Wrocław, Plac Grunwaldzki"
      },
      members: [
        "użytkownik1",
        "użytkownik2",
        "użytkownik3",
        "użytkownik4",
        "użytkownik5"
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.state.member.id) {
      this.getMemberDetails(nextProps.match.params.id);
    }
  }

  componentDidMount() {
    console.log("jest");
    this.getMemberDetails();
  }

  getMemberDetails(nextProps = this.props.match.params.id) {
    this.setState(prevState => ({
      member: {
        ...prevState.member,
        id: nextProps
      }
    }));
  }

  renderItem(member, index) {
    return (
      <Row
        key={index}
        onClick={() => {
          this.props.history.push("/memberDetails/" + index);
        }}
      >
        <Col>
          <ListGroupItem>{member}</ListGroupItem>
        </Col>
      </Row>
    );
  }

  render() {
    const members = _.map(this.state.members, (member, k) => {
      return this.renderItem(member, k);
    });

    return (
      <div id="Page">
        <div id="Members">
          <h1 className="Header" id="">
            Lista użytkowników:
          </h1>
          {members}
        </div>
        <div id="MemberDetails">
          <h2 className="Header">Szczegóły o użytkowniku:</h2>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">ID: </b>
                {this.state.member.id}
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroupItem>
                <b className="detailsHeader">Imię: </b>
                {this.state.member.name}
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
