import axios from "axios";
import React from "react";
import { Button, ListGroup, Tab, Tabs, Form } from "react-bootstrap";
import "./style.css";
import ReactTooltip from "react-tooltip";

export default class AddEventTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      events: {
        ownerId: 0,
        guideId: 0,
        name: "",
        startDate: "",
        endDate: "",
        location: "",
        meetingLocation: "",
        personalCargoType: "",
        distance: 315.0
      },
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
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };
    console.log(this.state);
    axios
      .post("/events", this.state.events, config)
      .then(response => {
        window.confirm("Wydarzenie dodane pomyślnie");
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChange = e => {
    console.log(e.target);

    let str = e.target.name.split(/(?=[_])/);
    let endpointName = str[0];
    let objectName = str[1].substring(1);
    console.log(endpointName);
    console.log(objectName);
    console.log(e.target.value);
    console.log(this.state);
    this.setState({
      [endpointName]: {
        ...this.state[endpointName],
        [objectName]: e.target.value
      }
    });
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
                <b>Typ załadunku osobistego: </b>
                <select
                  name="events_personalCargoType"
                  onChange={this.onChange}
                  data-tip="Lekki - małe ILBE <br/>
                  Cięzki - duże ILBE <br/> Bardzo ciężki - duże ILBE + torba realizacyjna"
                  data-place="right"
                  data-multiline="true"
                >
                  <option>Lekki</option>
                  <option>Ciężki</option>
                  <option>Bardzo ciężki</option>
                </select>
                <ReactTooltip effect="solid" type="info" />
              </ListGroup.Item>

              <ListGroup.Item>
                <b>Odległość od miejsca zbiórki:</b>{" "}
                <input name="events_distance" onChange={this.onChange} />
              </ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="gears" title="Sprzęt">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Typ: </b>
                <select name="gears_type" onChange={this.onChange}>
                  <option>Lekki</option>
                  <option>Ciężki</option>
                  <option>Bardzo ciężki</option>
                </select>
                <ReactTooltip effect="solid" type="info" />
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
        </Tabs>

        <Button onClick={this.postEventInfo}> Zapisz dane </Button>
      </div>
    );
  }
}
