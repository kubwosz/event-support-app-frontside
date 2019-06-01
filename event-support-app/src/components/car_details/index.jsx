import React from "react";
import { Form, Button, Col } from "react-bootstrap";

export default class CarDetails extends React.Component {
  render() {
    return (
      <div className="carDetails">
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Model</Form.Label>
          <Form.Control
            required
            name="model"
            placeholder="Model"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Spalanie (l/km)</Form.Label>
          <Form.Control
            required
            name="combustion"
            type="number"
            step="0.1"
            placeholder="Spalanie"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Liczba miejsc</Form.Label>
          <Form.Control
            required
            name="peopleCapacity"
            type="number"
            placeholder="Liczba miejsc"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Pojemność na bagaże</Form.Label>
          <Form.Control
            required
            name="cargoCapacity"
            type="number"
            step="0.1"
            placeholder="Pojemność na bagaże"
            onChange={this.onChange}
          />
        </Form.Group>
      </div>
    );
  }
}
