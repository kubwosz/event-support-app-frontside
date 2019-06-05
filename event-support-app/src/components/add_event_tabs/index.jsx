import axios from "axios";
import React from "react";
import { Button, ListGroup, Tab, Tabs } from "react-bootstrap";
import "./style.css";

export default class AddEventTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      events: {},
      tasks: {
        taskEventId: 0,
        userId: 0,
        status: "",
        description: ""
      },
      gears: {
        gearEventId: 0,
        type: "",
        camouflage: "",
        additionalGear: ""
      },
      purchases: {
        eventId: 0,
        userId: 0,
        item: "",
        cost: 0,
        status: "",
        costDistribution: ""
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        events: this.props.events
      });
    }
  }

  getToken() {
    const tkn = localStorage.getItem("token");
    this.setState({ token: tkn }, () => {
      this.getData("task");
      this.getData("gear");
      this.getData("purchase");
    });
  }

  postEventInfo = () => {
    console.log("this.state");
    console.log(this.state);
    return;
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };

    console.log(this.state);
    axios
      .post("/events", this.state.event, config)
      .then(response => {
        console.log(response);
        window.confirm("Wydarzenie dodane pomyślnie");
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChange = e => {
    let str = e.target.name.split(/(?=[_])/);
    let endpointName = str[0];
    let objectName = str[1].substring(1);
    this.setState({
      [endpointName]: {
        ...this.state[endpointName],
        [objectName]: e.target.value
      }
    });
    console.log(this.state);
  };

  render() {
    return (
      <div id="EventInformations">
        <Tabs defaultActiveKey="main" id="uncontrolled-tab-example">
          <Tab eventKey="main" title="Główne">
            <ListGroup variant="flush">
              {/* <ListGroup.Item>
                  <b> Utworzone przez:</b> <input name  onChange={this.onChange} />
                </ListGroup.Item> */}
              <ListGroup.Item>
                <b>Miejsce zbiórki:</b>{" "}
                <input name="events_meetingLocation" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Odległość od miejsca zbiórki:</b>{" "}
                <input name="events_meetingLocation" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Rozpoczęcie wydarzenia:</b>{" "}
                <input name="events_startDate" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Zakończenie wydarzenia:</b>{" "}
                <input name="events_endDate" onChange={this.onChange} />
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="date" title="Koszty">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Koszt transportu:</b>{" "}
                <input name="events_transportCost" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Koszt do podziału:</b>{" "}
                <input name="events_sharedCost" onChange={this.onChange} />
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="cargo" title="Bagaż">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Rodzaj bagażu:</b>{" "}
                <input name="events_cargoCapacity" onChange={this.onChange} />
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
                <b>Typ:</b> <input name="gears_type" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Kamuflaż:</b>{" "}
                <input name="gears_camouflage" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Dodatkowa odzież:</b>{" "}
                <input name="gears_additionalGear" onChange={this.onChange} />
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="tasks" title="Zadania">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Status:</b>{" "}
                <input name="tasks_status" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Opis:</b>{" "}
                <input name="tasks_description" onChange={this.onChange} />
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
                <b>Lider:</b>{" "}
                <input name="participants_leader" onChange={this.onChange} />
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="purchases" title="Do kupienia">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Przedmiot:</b>{" "}
                <input name="purchases_item" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Koszt:</b>{" "}
                <input name="purchases_cost" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Status:</b>{" "}
                <input name="purchases_status" onChange={this.onChange} />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Koszty dystrybucji:</b>{" "}
                <input
                  name="purchases_costDistribution"
                  onChange={this.onChange}
                />
              </ListGroup.Item>
            </ListGroup>
          </Tab>
        </Tabs>

        <Button onClick={this.postEventInfo}> Zapisz dane </Button>
      </div>
    );
  }
}
