import axios from "axios";
import moment from "moment";
import "moment/locale/pl";
import React from "react";
import { Container, Jumbotron, Button, Badge } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import EventDetailsTabs from "../event_details_tabs/index";
import "./style.css";
import _ from "lodash";

class EventDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      event: {
        id: 0,
        ownerId: 0,
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
        this.setState({
          event: res.data[0]
        });
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  }

  deleteEvent = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };

    axios
      .delete("/events" + "/" + this.state.event.id, config)
      .then(res => {
        this.props.history.push("/events");
        window.confirm("Usunięto pomyślnie");
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  };

  getParticipants = () => {
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
            console.log("participants");
            console.log(res.data);
          }
        );
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  };

  registerParticipant = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };
    axios
      .post(
        "/participants",
        {
          eventId: this.state.event.id,
          userId: localStorage.getItem("userId"),
          role: "Automatic Rifleman",
          leader: 2
        },
        config
      )
      .then(res => {
        window.confirm("Zapisano pomyślnie");
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  };

  unregisterParticipant = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };
    axios
      .delete(
        "/participants",
        {
          eventId: this.state.event.id,
          userId: localStorage.getItem("userId"),
          role: "Automatic Rifleman",
          leader: 2
        },
        config
      )
      .then(res => {
        window.confirm("Zapisano pomyślnie");
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  };

  checkIfUserParticipates = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      },
      params: {
        userId: localStorage.getItem("userId")
      }
    };

    axios
      .get("/participants", config)
      .then(res => {
        if (res.data === []) {
          this.setState({ eventParticipationId: res.data[0] });
          return false;
        } else {
          return true;
        }
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  };

  returnDate = event => {
    let startDate = moment(event.startDate);
    let endDate = moment(event.endDate);
    let component = {};

    if (startDate.isValid() && endDate.isValid()) {
      component = (
        <h5>
          {startDate.format("LLLL")} - {endDate.format("LLLL")}
        </h5>
      );
    } else {
      component = <h5>Brak ustalonej daty</h5>;
    }

    return component;
  };

  returnOwnerBtns = () => {
    return (
      <div id="OwnerBtns">
        <Button
          onClick={() =>
            this.props.history.push(
              "/event/" + this.props.match.params.id + "/edit"
            )
          }
        >
          Edytuj wydarzenie
        </Button>
        <Button onClick={() => this.deleteEvent()}>Usuń</Button>
      </div>
    );
  };

  render() {
    let event = this.state.event;

    return (
      <div id="eventDetailsPage">
        <div id="eventLeft">
          <Jumbotron className="jumbotronEvent" id="eventJumbotronMain" fluid>
            {parseInt(this.state.event.ownerId) ===
            parseInt(localStorage.getItem("userId"))
              ? this.returnOwnerBtns()
              : null}
            <Container id="MainInfo">
              <h1>{event.name}</h1>
              <h2>{event.location}</h2>
              {this.returnDate(event)}
              <p />
            </Container>
            <div id="RegisterBtn">
              {!this.checkIfUserParticipates ? (
                <Button onClick={() => this.registerParticipant()}>
                  Zapisz się na wydarzenie
                </Button>
              ) : (
                <h4>
                  <Badge variant="secondary">
                    Jesteś zapisany na wydarzenie
                  </Badge>
                  <Button onClick={() => this.unregisterParticipant()}>
                    Wypisz się
                  </Button>
                </h4>
              )}
            </div>
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
