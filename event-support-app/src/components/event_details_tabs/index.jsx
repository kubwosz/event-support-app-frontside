import React from "react";
import { Tabs, Tab, Jumbotron, Container, ListGroup } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";
import axios from "axios";

export default class EventDetailsTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      event: {}
    };
  }

  componentDidMount() {
    this.getEvent();
  }

  getEvent() {
    this.setState({
      event: this.props.event
    });
  }

  render() {
    let event = this.props.event;
    return (
      <div id="EventInformations">
        <Tabs defaultActiveKey="main" id="uncontrolled-tab-example">
          <Tab eventKey="main" title="Główne">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b> Utworzone przez:</b> {event.ownersName}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Miejsce wydarzenia:</b> {event.location}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Miejsce zbiórki:</b> {event.meetingLocation}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Odległość od miejsca zbiórki:</b> {event.distance}
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
                <b>Koszt transportu:</b> {event.meetingLocation}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Koszt do podziału:</b> {event.distance}
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="cargo" title="Bagaż">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Rodzaj bagażu:</b> {event.personalCargoType}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Pojemność auta:</b> {event.cargoCapacity}
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="gears" title="Odzież">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Typ:</b> {event.GearsType}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Kamuflaż:</b> {event.GearsCamoufalge}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Dodatkowa odzież:</b> {event.GearsAdditional}
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="tasks" title="Zadania">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Status:</b> {event.TasksStatus}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Opis:</b> {event.TasksDescription}
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="participants" title="Uczestnicy">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Rola:</b> {event.participantsRole}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Lider:</b> {event.participantsLeader}
              </ListGroup.Item>
              <b>Lista uczestników:</b>
            </ListGroup>
          </Tab>

          <Tab eventKey="purchases" title="Do kupienia">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Przedmiot:</b> Bazooka
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Koszt:</b> 1,50zł
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Status:</b> W drodze z Iranu
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Koszty dystrybucji:</b> 50zł
              </ListGroup.Item>
            </ListGroup>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
