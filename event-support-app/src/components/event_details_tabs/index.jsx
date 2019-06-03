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
      token: "",
      event: {},
      task: {},
      gear: {},
      purchase: {}
    };
  }

  componentDidMount() {
    this.getEvent();
    this.getToken();
    //promise.then();
  }

  getToken() {
    const tkn = localStorage.getItem("token");
    this.setState({ token: tkn }, () => {
      this.getData("task");
      this.getData("gear");
      this.getData("purchase");
    });
  }

  getEvent() {
    this.setState({
      event: this.props.event
    });
  }

  getData = type => {
    console.log("TASKS");
    console.log(this.props);
    console.log(this.state);
    var config = {
      headers: {
        Authorization: this.state.token
      }
    };
    axios
      .get("/" + type + "s", config)
      .then(res => {
        console.log("res2");
        console.log(res);
        this.setState({
          [type]: res.data[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // getPurchases() {
  //   var config = {
  //     headers: {
  //       Authorization: this.state.token
  //     },
  //     params: {
  //       id: parseInt(this.props.match.params.id)
  //     }
  //   };
  //   axios
  //     .get("/purchases", config)
  //     .then(res => {
  //       this.setState({
  //         purchases: res.data[0]
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // getCargos() {
  //   var config = {
  //     headers: {
  //       Authorization: this.state.token
  //     },
  //     params: {
  //       id: parseInt(this.props.match.params.id)
  //     }
  //   };
  //   axios
  //     .get("/cargos", config)
  //     .then(res => {
  //       this.setState({
  //         cargos: res.data[0]
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // getGears() {
  //   var config = {
  //     headers: {
  //       Authorization: this.state.token
  //     },
  //     params: {
  //       id: parseInt(this.props.match.params.id)
  //     }
  //   };
  //   axios
  //     .get("/gears", config)
  //     .then(res => {
  //       this.setState({
  //         cargos: res.data[0]
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // getTasks() {
  //   var config = {
  //     headers: {
  //       Authorization: this.state.token
  //     },
  //     params: {
  //       id: parseInt(this.props.match.params.id)
  //     }
  //   };
  //   axios
  //     .get("/tasks", config)
  //     .then(res => {
  //       this.setState({
  //         cargos: res.data[0]
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    console.log("this.state");
    console.log(this.state);
    let { event, task, gear, purchase } = this.state;

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
                <b>Status:</b> {task.status}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Opis:</b> {task.description}
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
