import React from "react";
import {
  Container,
  FormControl,
  InputGroup,
  Jumbotron,
  FormGroup
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import AddEventTabs from "../add_event_tabs/index";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      events: {
        ownerId: 0,
        name: "",
        ownersName: "",
        location: "",
        startDate: new Date(),
        endDate: new Date(),
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

  componentDidMount() {
    const ownerId = localStorage.getItem("userId");
    console.log("OWNERID");
    console.log(ownerId);
    this.setState(
      {
        events: {
          ...this.state.events,
          ownerId: parseInt(ownerId)
        }
      },
      () => console.log(this.state)
    );
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
    console.log(this.state);
  };

  handleDateTimeChangeStart = date => {
    console.log(date);
    this.setState({
      events: { ...this.state.events, startDate: date }
    });
  };

  handleDateTimeChangeEnd = date => {
    this.setState({
      events: { ...this.state.events, endDate: date }
    });
  };

  render() {
    return (
      <div>
        <Jumbotron className="JumbotronEvent jumbotronAddEvent" fluid>
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
                  Data rozpoczęcia wydarzenia:
                </InputGroup.Text>
                <DatePicker
                  name="startDate"
                  selected={this.state.events.startDate}
                  onChange={this.handleDateTimeChangeStart}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="d MMMM, H:mm, yyyy"
                  timeCaption="time"
                  locale="pl"
                />
                <InputGroup.Text id="inputGroup-sizing-default">
                  Data zakończenia wydarzenia:
                </InputGroup.Text>
                <DatePicker
                  name="endDate"
                  selected={this.state.events.endDate}
                  onChange={this.handleDateTimeChangeEnd}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="d MMMM, H:mm, yyyy"
                  timeCaption="time"
                  locale="pl"
                />
              </InputGroup.Prepend>
            </InputGroup>
          </Container>
        </Jumbotron>
        {this.state.events.id === 0 ? null : (
          <AddEventTabs events={this.state.events} />
        )}
      </div>
    );
  }
}

export default withRouter(AddEvent);
