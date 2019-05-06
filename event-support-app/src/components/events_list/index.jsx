import React from "react";
import { Card, CardGroup, CardDeck, CardColumns } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";

class EventsList extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      eventsToRow: []
    };
  }

  componentDidMount() {
    this.getAllMembers();
  }

  getAllMembers() {
    this.setState({
      events: [
        "wydarzenie1",
        "wydarzenie2",
        "wydarzenie3",
        "wydarzenie4",
        "wydarzenie5",
        "wydarzenie6",
        "wydarzenie7",
        "wydarzenie8",
        "wydarzenie9"
      ]
    });
  }

  renderEvents = (event, index) => {
    return (
      <Card
        className="grid-item"
        onClick={() => {
          this.props.history.push("/event/" + index);
        }}
      >
        <Card.Body>
          <Card.Title>{event}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Wyjazd duży w bieszczady
          </Card.Subtitle>
          <Card.Text>
            Dokładny opis {event} o tym co i jak zabrać, w jakim miejscu. Więcej
            informacji po kliknięciu.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  render() {
    const events = _.map(this.state.events, (event, k) => {
      return this.renderEvents(event, k);
    });

    return (
      <div id="EventsList">
        <h1 className="Header">Lista wydarzeń:</h1>
        <div className="grid-wrapper">{events}</div>
      </div>
    );
  }
}

export default withRouter(EventsList);
