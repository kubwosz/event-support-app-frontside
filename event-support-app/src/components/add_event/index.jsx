import React from "react";
import { Tabs, Tab, Jumbotron, Container, ListGroup } from "react-bootstrap";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";
import axios from "axios";
import AddEventTabs from "../add_event_tabs/index";

class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      events: {
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
        gearsType: ""
      }
    };
  }

  onChange = e => {
    let str = e.target.name.split(/(?=[_])/);
    let endpointName = str[0];
    let objectName = str[1].substring(1);
    this.setState({
      [endpointName]: {
        ...this.state.events,
        [objectName]: e.target.value
      }
    });
    //console.log(this.state);
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
                name="events_name"
                a
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
                name="events_location"
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
        {this.state.events.id === 0 ? null : (
          <AddEventTabs events={this.state.events} />
        )}
      </div>
    );
  }
}

export default withRouter(AddEvent);
