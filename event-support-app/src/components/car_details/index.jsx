import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

export default class CarDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      ownerId: 0,
      model: "",
      combustion: 0,
      peopleCapacity: 0,
      cargoCapacity: 0
    };
  }

  componentDidMount() {
    this.getCar();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getCar = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      },
      params: {
        ownerId: localStorage.getItem("userId")
      }
    };

    axios
      .get("/cars", config)
      .then(res => {
        console.log(res.data);
        this.setState(res.data[0], () => {
          console.log(this.state);
        });
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  };

  postCar = () => {
    const token = localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: token
      }
    };

    console.log(this.state);
    axios
      .post(
        "/cars",
        {
          ownerId: localStorage.getItem("userId"),
          model: this.state.model,
          combustion: this.state.combustion,
          peopleCapacity: this.state.peopleCapacity,
          cargoCapacity: this.state.cargoCapacity
        },
        config
      )
      .then(res => {
        this.setState({
          user: res.data
        });
        window.confirm("Udało się dodać samochód");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="carDetails">
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Model</Form.Label>
          <Form.Control
            required
            name="model"
            placeholder={this.state.model ? this.state.model : "Model"}
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
            placeholder={this.state ? this.state.combustion : "Spalanie"}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Liczba miejsc</Form.Label>
          <Form.Control
            required
            name="peopleCapacity"
            type="number"
            placeholder={
              this.state ? this.state.peopleCapacity : "Liczba miejsc"
            }
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
            placeholder={
              this.state ? this.state.cargoCapacity : "Pojemność na bagaże"
            }
            onChange={this.onChange}
          />
        </Form.Group>
        <Button onClick={this.postCar}>Akceptuj</Button>
      </div>
    );
  }
}
