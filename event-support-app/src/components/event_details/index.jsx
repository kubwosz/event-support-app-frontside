import React from "react";
import { Tabs, Tab, Jumbotron, Container, ListGroup } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";
import axios from "axios";

class EventDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      event: {
        id: 0,
        owner_id: 0,
        name: "",
        ownersName: "",
        location: "",
        startDate: "",
        endDate: "",
        meetingLocation: "",
        distance: 0,
        personalCargoType: "",
        transportCost: 0,
        sharedCost: 0,
        cargoCapacity: 0,
        GearsType: ""
      }
    };
  }

  componentDidMount() {
    this.getEvent();
  }

  getEvent() {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      },
      params: {
        id: parseInt(this.props.match.params.id) + 1
      }
    };

    axios
      .get("/events", config)
      .then(res => {
        console.log(res);
        this.setState(
          {
            event: res.data[0]
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="eventDetailsPage">
        <div id="eventLeft">
          <Jumbotron className="jumbotronEvent" id="eventJumbotronMain" fluid>
            <Container>
              <h1>{this.state.event.name}</h1>
              <h2>{this.state.event.location}</h2>
              <h5>17 maja 2019 13:00 - 19 maja 2019 18:30</h5>
              <p />
            </Container>
          </Jumbotron>
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
                    <b>Rozpoczęcie wydarzenia:</b> 17 maja 2019 13:00
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Zakończenie wydarzenia:</b> 19 maja 2019 18:30
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

        <div id="eventRight">
          <Jumbotron id="jumbotronGuides" fluid>
            <Container>
              <h4>Przewodnik:</h4>
              <p> Daniel Piotrkowski</p>
              <p> organizator@mail.com</p>

              <h4>Nasz łącznik</h4>
              <p>Jan Kowalski</p>
            </Container>
          </Jumbotron>

          <Jumbotron id="jumbotronCosts" fluid>
            <Container>
              <h3>Całkowity koszt wyjazdu:</h3>
              <p> 1200.00 PLN</p>

              <h3>Na osobę:</h3>
              <p>100.00PLN</p>
            </Container>
          </Jumbotron>

          <Jumbotron id="jumbotronCostsOther" fluid>
            <Container>
              <h4>Całkowity koszt zakupów:</h4>
              <p> 1000.00PLN</p>
              <h4>Dzielony koszt zakupów:</h4>
              <p> 600.00PLN</p>
              <h4>Dzielony koszt zakupów na osobę:</h4>
              <p> 50.00PLN</p>
              <p />
              <h4>Całkowity koszt paliwa:</h4>
              <p> 1000.00PLN</p>
              <h4>Koszt paliwa na osobę:</h4>
              <p> 50.00PLN</p>
            </Container>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withRouter(EventDetails);
