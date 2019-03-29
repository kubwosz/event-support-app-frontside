import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { Form, Button, Col} from 'react-bootstrap';


export default class RegisterPage extends React.Component{
    render(){
        return(
        <div style={{width:"60%", margin:"auto"}}>
<Jumbotron fluid>
  <Container>
    <h1>Zarejestruj się:</h1>
    <Form>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Imię</Form.Label>
      <Form.Control placeholder="Imię" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridSurname">
      <Form.Label>Nazwisko</Form.Label>
      <Form.Control placeholder="Nazwisko" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridNickname">
      <Form.Label>Ksywa</Form.Label>
      <Form.Control  placeholder="Ksywa" />
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Hasło</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword2">
      <Form.Label>Powtórz hasło</Form.Label>
      <Form.Control type="password" placeholder="Hasło" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Adres</Form.Label>
    <Form.Control placeholder="Pełny adres" />
  </Form.Group>

  <Form.Row>


  <Form.Group>
          <Form.Check
            type="checkbox"
            label="Czy posiadasz auto?"
          />
        </Form.Group>

  </Form.Row>

  <Button variant="primary" type="submit">
    Zarejestruj
  </Button>
</Form>
  </Container>
</Jumbotron>
</div>
        )
    }
}