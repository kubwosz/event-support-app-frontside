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
            Taki tam wyjeździk dgdzies
          </Card.Subtitle>
          <Card.Text>
            OPISIKk example text to build on the card title and make up the bulk
            of the card's content. + {event}
          </Card.Text>
          <Card.Link href="#">Link gdzieś tam</Card.Link>
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
        <h1 className="Header">Lista eventów:</h1>
        <div className="grid-wrapper">{events}</div>
      </div>
    );
  }
}

export default withRouter(EventsList);
