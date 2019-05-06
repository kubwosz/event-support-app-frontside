import React from "react";
import { Tabs, Tab, Jumbotron, Container, ListGroup } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "./style.css";

class AddEvent extends React.Component {
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
        cargoCapacity: 0
      }
    };
  }

  componentDidMount() {
    this.getAllMembers();
  }

  getAllMembers(nextProps = this.props.match.params.id) {
    this.setState(prevState => ({
      event: {
        ...prevState.event,
        id: nextProps
      }
    }));
  }

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
              />
            </InputGroup>
          </Container>
        </Jumbotron>
        <h1 id="eventInfo">Informacje o wydarzeniu:</h1>
        <div id="EventInformations">
          <Tabs defaultActiveKey="main" id="uncontrolled-tab-example">
            <Tab eventKey="main" title="Główne">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b> Utworzone przez:</b> <input />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Miejsce wydarzenia:</b> <input />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Miejsce zbiórki:</b> <input />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Odległość od miejsca zbiórki:</b> <input />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Rozpoczęcie wydarzenia:</b> <input />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Zakończenie wydarzenia:</b> <input />
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="date" title="Koszty">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Koszt transportu:</b> <input />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Koszt do podziału:</b> <input />
                </ListGroup.Item>
              </ListGroup>
            </Tab>

            <Tab eventKey="cargo" title="Bagaż">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Rodzaj bagażu:</b> <input />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Pojemność auta:</b> <input />
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default withRouter(AddEvent);
