import React from 'react';
import { Container, Row, Col, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

export default class MembersList extends React.Component{

  constructor()
  {
      super();
      this.state = {
          members: []
      };
  }

  componentDidMount() {
    this.getAllMembers();
}

getAllMembers() {
 this.setState({
   members: ["użytkownik1","użytkownik2","użytkownik3","użytkownik4","użytkownik5"]
 })
}

renderItem(member, index) {
  return (
          <Row key={index} onClick = {() => {this.props.history.push("/memberDetails/" + index)}}>
              <Col></Col>
              <Col style={{padding: "0.7%"}}>
                  <ListGroupItem>
                      {member}
                      </ListGroupItem>
              </Col>
              <Col></Col>
          </Row>
  )
}


  render() {
    const members = _.map(this.state.members, (member, k) => {
        return this.renderItem(member, k);
    });
    return (
      <div>
    <h1>Lista użytkowników:</h1>
    <Container style={{width: "60%"}}>
     {members}
    </Container>
    </div>
    );
}
}