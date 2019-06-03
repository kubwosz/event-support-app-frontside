import React from "react";
import {
  Card,
  CardGroup,
  CardDeck,
  CardColumns,
  Pagination
} from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";
import axios from "axios";
import moment from "moment";

class EventsList extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      eventsToRow: [],
      activePage: 1,
      eventsPerPage: 6,
      totalPages: 3,
      token: {}
    };
  }

  componentDidMount() {
    this.getAllMembers();
  }

  getAllMembers() {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };

    axios.get("/events", config).then(res => {
      console.log(res);
      this.setState({
        events: res.data
      });
    });
  }

  renderEvents = (event, index) => {
    if (
      index >=
        this.state.activePage * this.state.eventsPerPage -
          this.state.eventsPerPage &&
      index < this.state.activePage * this.state.eventsPerPage
    ) {
      return (
        <Card
          className="grid-item"
          onClick={() => {
            this.props.history.push("/event/" + event.id);
          }}
        >
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {moment(event.startDate).format("DD-MM-YYYY, HH:mm")} -{" "}
              {moment(event.endDate).format("DD-MM-YYYY, HH:mm")}
            </Card.Subtitle>
            <Card.Text>
              Dokładny opis {event.meetingLocation} o tym co i jak zabrać, w
              jakim miejscu. Więcej informacji po kliknięciu.
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    const events = _.map(this.state.events, (event, k) => {
      return this.renderEvents(event, k);
    });

    let items = [];
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === this.state.activePage}
          onClick={() => {
            this.setState({ activePage: number });
          }}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <div id="EventsList">
        <h1 className="Header">Lista wydarzeń:</h1>
        <div className="grid-wrapper">{events}</div>

        <Pagination>{items}</Pagination>
      </div>
    );
  }
}

export default withRouter(EventsList);
