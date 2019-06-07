import axios from "axios";
import moment from "moment";
import "moment/locale/pl";
import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import EventDetailsTabs from "../event_details_tabs/index";
import "./style.css";

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
      },
      participants: []
    };
  }

  componentDidMount() {
    this.getEvent();
    this.getParticipants();
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
        console.log("res");
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
        console.log("err");
        console.log(err);
      });
  }

  getParticipants() {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      },
      params: {
        eventId: parseInt(this.props.match.params.id)
      }
    };
    axios
      .get("/participants", config)
      .then(res => {
        this.setState(
          {
            participants: res.data
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  }

  render() {
    let event = this.state.event;
    return (
      <div id="eventDetailsPage">
        <div id="eventLeft">
          <Jumbotron className="jumbotronEvent" id="eventJumbotronMain" fluid>
            <Button
              id="EditBtn"
              onClick={() => this.props.history.push("/event/9/edit")}
            >
              Edytuj wydarzenie
            </Button>
            <Container id="MainInfo">
              <h1>{event.name}</h1>
              <h2>{event.location}</h2>
              <h5>
                {moment(event.startDate).format("LLLL")} -{" "}
                {moment(event.endDate).format("LLLL")}
              </h5>
              <p />
            </Container>
            <Button id="RegisterBtn">Zapisz się na wydarzenie</Button>
          </Jumbotron>

          {event.id === 0 ? null : <EventDetailsTabs event={event} />}
        </div>

        <div id="eventRight">
          <Jumbotron id="jumbotronGuides" fluid>
            <Container>
              <h4>Przewodnik:</h4>
              Daniel Piotrkowski organizator@mail.com
              <h4>Nasz łącznik</h4>
              Jan Kowalski
            </Container>
          </Jumbotron>

          <Jumbotron id="jumbotronCosts" fluid>
            <Container>
              <h4>Całkowity koszt wyjazdu:</h4>
              1200.00 PLN
              <h4>Na osobę:</h4>
              100.00PLN
            </Container>
          </Jumbotron>

          <Jumbotron id="jumbotronCostsOther" fluid>
            <Container>
              <h5>Całkowity koszt zakupów:</h5>
              <p> 1000.00PLN</p>
              <h5>Dzielony koszt zakupów:</h5>
              <p> 600.00PLN</p>
              <h5>Dzielony koszt zakupów na osobę:</h5>
              <p> 50.00PLN</p>
              <p />
              <h5>Całkowity koszt paliwa:</h5>
              <p> 1000.00PLN</p>
              <h5>Koszt paliwa na osobę:</h5>
              <p> 50.00PLN</p>
            </Container>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withRouter(EventDetails);
