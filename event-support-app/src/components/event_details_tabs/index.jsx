import axios from "axios";
import React from "react";
import _ from "lodash";
import { ListGroup, Tab, Tabs, Button } from "react-bootstrap";
import ModalComponent from "../event_modal/index.jsx";
import "./style.css";

export default class EventDetailsTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      event: {},
      cargos: [],
      tasks: {},
      gears: {},
      purchases: {},
      modalShow: false,
      propToModal: ""
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
      this.getData("cargos");
      // this.getData("tasks");
      // this.getData("gears");
      this.getData("purchases");
    });
  }

  getEvent() {
    this.setState({
      event: this.props.event
    });
  }

  getData = type => {
    var config = {
      headers: {
        Authorization: this.state.token
      }
    };
    axios
      .get("/" + type, config)
      .then(res => {
        console.log("object");
        console.log(res);
        this.setState({
          [type]: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderCargos = (cargo, index) => {
    return (
      <ListGroup variant="flush">
        <h4>Przedmiot nr {index}</h4>
        <ListGroup.Item>
          <b>Nazwa przedmiotu:</b> {cargo.item}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Objętość(duże ILBE):</b> {cargo.volume}
        </ListGroup.Item>
      </ListGroup>
    );
  };

  renderPurchases = (cargo, index) => {
    return (
      <ListGroup variant="flush">
        <h4>Przedmiot nr {index}</h4>
        <ListGroup.Item>
          <b>Przedmiot:</b> {cargo.item}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Koszt:</b> {cargo.cost}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Status:</b> Oczekiwanie na dostawę
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Koszty dystrybucji:</b> {cargo.costDistribution}
        </ListGroup.Item>
      </ListGroup>
    );
  };

  render() {
    let { event, task, gear, purchase } = this.state;

    const cargos = _.map(this.state.cargos, (cargo, k) => {
      return this.renderCargos(cargo, k);
    });

    const purchases = _.map(this.state.purchases, (cargo, k) => {
      return this.renderPurchases(cargo, k);
    });

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div id="EventInformations">
        <ModalComponent
          prop={this.state.propToModal}
          eventId={this.state.event.id}
          show={this.state.modalShow}
          onHide={modalClose}
        />

        <Tabs defaultActiveKey="main" id="uncontrolled-tab-example">
          <Tab eventKey="main" title="Główne">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b> Utworzone przez:</b> {event.ownersName}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Miejsce zbiórki:</b> {event.meetingLocation}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Typ załadunku osobistego: </b> {event.personalCargoType}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Odległość od miejsca zbiórki:</b> {event.distance}
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="cargo" title="Bagaż">
            <Button
              onClick={() => {
                this.setState({ modalShow: true, propToModal: "cargo" });
              }}
            >
              Dodaj
            </Button>
            {cargos}
          </Tab>

          <Tab eventKey="gears" title="Sprzęt">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Typ: </b>
                {event.GearsType}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Kamuflaż:</b> {event.GearsCamoufalge}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Dodatkowa odzież:</b>
                {event.GearsAdditional}
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="tasks" title="Zadania">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Status:</b> Zrobione
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Opis:</b> Zarezerwować namioty
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
            <Button
              onClick={() => {
                this.setState({ modalShow: true, propToModal: "purchase" });
              }}
            >
              Dodaj
            </Button>
            {purchases}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
