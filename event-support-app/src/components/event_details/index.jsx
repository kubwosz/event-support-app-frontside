import React from "react";
import { Tabs, Tab, Jumbotron, Container, ListGroup } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";

class EventDetails extends React.Component {
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
        cargoCapacity: 20,
        GearsType: ""
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
      <div>
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

            <Tab eventKey="gears" title="Odzież">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Typ:</b> {this.state.event.GearsType}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Kamuflaż:</b> {this.state.event.GearsCamoufalge}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Dodatkowa odzież:</b> {this.state.event.GearsAdditional}
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="tasks" title="Zadania">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Status:</b> {this.state.event.TasksStatus}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Opis:</b> {this.state.event.TasksDescription}
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="participants" title="Uczestnicy">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Rola:</b> {this.state.event.participantsRole}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Lider:</b> {this.state.event.participantsLeader}
                </ListGroup.Item>
                <b>Lista uczestników:</b>
              </ListGroup>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default withRouter(EventDetails);
