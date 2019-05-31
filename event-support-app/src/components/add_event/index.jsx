import React from "react";
import { Tabs, Tab, Jumbotron, Container, ListGroup } from "react-bootstrap";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";
import Axios from "axios";

class AddEvent extends React.Component {
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
        gearsType: "",
        cargo_id: 0,
        cargo_event_id: 0,
        item: "",
        volume: "",
        gear_id: 0,
        gear_event_id: 0,
        type: "",
        camouflage: "",
        additional_gear: "",
        task_id: 0,
        task_event_id: 0,
        user_id: 0,
        status: "",
        description: ""
      }
    };
  }

  postEventInfo = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };

    console.log(this.state);
    Axios.post(
      "/events",
      {
        owner_id: this.state.owner_id,
        name: this.state.name,
        location: this.state.location,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        meetingLocation: this.state.meetingLocation,
        distance: this.state.distance,
        personalCargoType: this.state.personalCargoType,
        transportCost: this.state.transportCost,
        sharedCost: this.state.sharedCost,
        cargoCapacity: this.state.cargoCapacity,
        cargoNeeds: this.state.cargoNeeds
      },
      config
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Jumbotron className="JumbotronEvent" fluid>
          <Container>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Nazwa wydarzenia:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Name"
                aria-describedby="inputGroup-sizing-default"
                name="name"
                onChange={this.onChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Lokalizacja wydarzenia:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Location"
                aria-describedby="inputGroup-sizing-default"
                name="location"
                onChange={this.onChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Data wydarzenia:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Date"
                aria-describedby="inputGroup-sizing-default"
                onChange={this.onChange}
              />
            </InputGroup>
          </Container>
        </Jumbotron>
        <h1 id="eventInfo">Informacje o wydarzeniu:</h1>
        <div id="EventInformations">
          <Tabs defaultActiveKey="main" id="uncontrolled-tab-example">
            <Tab eventKey="main" title="Główne">
              <ListGroup variant="flush">
                {/* <ListGroup.Item>
                  <b> Utworzone przez:</b> <input name  onChange={this.onChange} />
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <b>Miejsce zbiórki:</b>{" "}
                  <input name="meetingLocation" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Odległość od miejsca zbiórki:</b>{" "}
                  <input name="meetingLocation" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Rozpoczęcie wydarzenia:</b>{" "}
                  <input name="startDate" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Zakończenie wydarzenia:</b>{" "}
                  <input name="endDate" onChange={this.onChange} />
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="date" title="Koszty">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Koszt transportu:</b>{" "}
                  <input name="transportCost" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Koszt do podziału:</b>{" "}
                  <input name="sharedCost" onChange={this.onChange} />
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="cargo" title="Bagaż">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Rodzaj bagażu:</b>{" "}
                  <input name="cargoType" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Pojemność auta:</b>{" "}
                  <input name="car_capacity" onChange={this.onChange} />
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="gears" title="Odzież">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Typ:</b>{" "}
                  <input name="gears_type" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Kamuflaż:</b>{" "}
                  <input name="camouflage" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Dodatkowa odzież:</b>{" "}
                  <input name="additional_gear" onChange={this.onChange} />
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="tasks" title="Zadania">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Status:</b>{" "}
                  <input name="task_status" onChange={this.onChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Opis:</b>{" "}
                  <input name="task_description" onChange={this.onChange} />
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="participants" title="Uczestnicy">
              <ListGroup variant="flush">
                {/* <ListGroup.Item>
                  <b>Rola:</b>{" "}
                  <input name="pa" onChange={this.onChange} />
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <b>Lider:</b> <input name="leader" onChange={this.onChange} />
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>

          <Button onClick={this.postEventInfo}> Zapisz dane </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddEvent);
