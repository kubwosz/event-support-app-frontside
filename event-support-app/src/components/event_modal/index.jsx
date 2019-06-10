import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargos: {
        eventId: props.eventId,
        item: "",
        volume: 0
      },
      purchases: {
        eventId: props.eventId,
        userId: localStorage.getItem("userId"),
        item: "",
        cost: 0,
        status: "",
        costDistribution: ""
      }
    };
  }

  onChange = e => {
    let str = e.target.name.split(/(?=[_])/);
    let endpointName = str[0];
    let objectName = str[1].substring(1);

    this.setState({
      [endpointName]: {
        ...this.state[endpointName],
        [objectName]: e.target.value
      }
    });
  };

  addCargo = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };
    console.log(this.state);
    axios
      .post(
        "/cargos",
        {
          eventId: this.props.eventId,
          item: this.state.cargos.item,
          volume: this.state.cargos.volume
        },
        config
      )
      .then(response => {
        window.confirm("Bagaż dodane pomyślnie");
      })
      .catch(err => {
        console.log(err);
      });
  };

  addPurchase = () => {
    const token = localStorage.getItem("token");

    var config = {
      headers: {
        Authorization: token
      }
    };
    console.log(this.state);
    axios
      .post(
        "/purchases",
        {
          eventId: this.props.eventId,
          userId: this.props.userId,
          item: this.state.purchases.item,
          cost: this.state.purchases.cost,
          status: this.state.purchases.status,
          costDistribution: this.state.purchases.costDistribution
        },
        config
      )
      .then(response => {
        window.confirm("Zakup dodane pomyślnie");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.props.prop == "cargo" ? (
          <div>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Dodawanie bagażu
              </Modal.Title>
            </Modal.Header>
            <Modal.Body id="modalBody">
              <b>Nazwa przedmiotu:</b>{" "}
              <input name="cargos_item" onChange={this.onChange} />
              <br />
              <b>Objętość(duże ILBE): </b>{" "}
              <input name="cargos_volume" onChange={this.onChange} />
              <Button onClick={this.addCargo}>Dodaj</Button>
            </Modal.Body>
          </div>
        ) : (
          <div>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Dodawanie zakupu
              </Modal.Title>
            </Modal.Header>
            <Modal.Body id="modalBody">
              <b>Nazwa przedmiotu:</b>{" "}
              <input name="purchases_item" onChange={this.onChange} />
              <br />
              <b>Koszt: </b>{" "}
              <input name="purchases_cost" onChange={this.onChange} />
              <br />
              <b>Koszt dystrybucji: </b>{" "}
              <input
                name="purchases_costDistribution"
                onChange={this.onChange}
              />
              <Button onClick={this.addPurchase}>Dodaj</Button>
            </Modal.Body>
          </div>
        )}

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Zamknij</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
