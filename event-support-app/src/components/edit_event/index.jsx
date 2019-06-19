import React from "react";
import { Container, FormControl, InputGroup, Jumbotron } from "react-bootstrap";
import EditEventTabs from "../edit_event_tabs/index";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import axios from "axios";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

export default class EditEvent extends React.Component {
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
    this.getEvent();
  }

  getEvent() {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      },
      params: {
        id: parseInt(this.props.match.params.id)
      }
    };

    axios
      .get("/events", config)
      .then(res => {
        this.setState({
          events: {
            ...res.data[0],
            startDate: new Date(res.data[0].startDate),
            endDate: new Date(res.data[0].endDate)
          }
        });
      })
      .catch(err => {
        console.log("error:");
        console.log(err);
      });
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
  };

  handleDateTimeChangeStart = date => {
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
                value={this.state.events.name}
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
                value={this.state.events.location}
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
          <EditEventTabs events={this.state.events} />
        )}
      </div>
    );
  }
}
