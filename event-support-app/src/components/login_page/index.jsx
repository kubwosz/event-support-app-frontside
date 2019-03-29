import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { Form, Button} from 'react-bootstrap';


export default class LoginPage extends React.Component{
    render(){
        return(
        <div style={{width:"40%", margin:"auto"}}>
<Jumbotron fluid>
  <Container>
    <h1>Zaloguj się:</h1>
  <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Adres email:</Form.Label>
    <Form.Control type="email" placeholder="Email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Hasło:</Form.Label>
    <Form.Control type="password" placeholder="Hasło" />
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
    <Form.Check type="checkbox" label="Zapamiętaj" />
  </Form.Group>
  <Button variant="primary" type="Zaloguj">
    Submit
  </Button>
</Form>
  </Container>
</Jumbotron>
</div>
        )
    }
}