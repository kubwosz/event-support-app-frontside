import React from "react";
import { Tabs, Tab, Jumbotron, Container, ListGroup } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";

class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      event: {
        id: -1,
        owner_id: 13,
        name: "Super REKOnstrukcja Air Soft Gun nad jeziorem!",
        ownersName: "Andrzejek",
        location: "Warszawa",
        startDate: "09-05-2020 13:00",
        endDate: "10-05-2020 17:00",
        meetingLocation: "Wroclaw",
        distance: 150,
        personalCargoType: "Jedna walizka duża, jedna mała",
        transportCost: 35.6,
        sharedCost: 35.6,
        cargoCapacity: 20
      }
    };
  }

  componentDidMount() {
    this.getAllMembers();
  }

  getAllMembers(nextProps = this.props.match.params.id) {
    this.setState(prevState => ({
      event: {
        ...prevState.event,
        id: nextProps
      }
    }));
  }

  render() {
    return (
      <div id="Page">
        <Jumbotron className="JumbotronEvent" fluid>
          <Container>
            <h1>{this.state.event.name}</h1>
            <h2>{this.state.event.location}</h2>
            <h5>
              {this.state.event.startDate} - {this.state.event.endDate}
            </h5>
            <p />
          </Container>
        </Jumbotron>
        <h1 id="eventInfo">Informacje o wydarzeniu:</h1>
        <div id="EventInformations">
          <Tabs defaultActiveKey="main" id="uncontrolled-tab-example">
            <Tab eventKey="main" title="Główne">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b> Utworzone przez:</b> {this.state.event.ownersName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Miejsce wydarzenia:</b> {this.state.event.location}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Miejsce zbiórki:</b> {this.state.event.meetingLocation}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Odległość od miejsca zbiórki:</b>{" "}
                  {this.state.event.distance}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Rozpoczęcie wydarzenia:</b> {this.state.event.startDate}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Zakończenie wydarzenia:</b> {this.state.event.endDate}
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="date" title="Koszty">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Koszt transportu:</b> {this.state.event.meetingLocation}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Koszt do podziału:</b> {this.state.event.distance}
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="cargo" title="Bagaż">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Rodzaj bagażu:</b> {this.state.event.personalCargoType}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Pojemność auta:</b> {this.state.event.cargoCapacity}
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default withRouter(AddEvent);
