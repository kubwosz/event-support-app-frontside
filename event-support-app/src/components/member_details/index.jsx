import React from 'react';
import { Container, Row, Col, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';
import './style.css'

export default class MemberDetails extends React.Component{

  constructor()
  {
      super();
      this.state = {
          member: {id: 0, name: "Adam", surname: "Kowalski", email: "sample@mail.com", address: "Wrocław, Plac Grunwaldzki"},
          members: []
      };
  }

  componentDidMount() {
    this.getMemberDetails();
}

getMemberDetails() {
 this.setState(prevState => ({
  member: {
    id: this.props.match.params.id,
    ...prevState.member
  },
   members: ["użytkownik1","użytkownik2","użytkownik3","użytkownik4","użytkownik5"]
 }));
}

renderMemberInList(member, index) {
  return (
          <Row key={index}>
              <Col></Col>
              <Col className ="memberList">
                  <ListGroupItem>
                      {member}
                      </ListGroupItem>
              </Col>
              <Col md="2"></Col>
          </Row>
  )
}

// renderMemberDetails(){
//   console.log("DUPADUPA");
//   return(

//   )
// }

  render() {
    const members = _.map(this.state.members, (member, k) => {
      return this.renderMemberInList(member, k);
  });

  return (
    <div id="Page">
  
  <div id="Members">
  <h1>Lista użytkowników:</h1>
   {members}
  </div>
  <div id="MemberDetails">
<h2>Szczegóły o użytkowniku:</h2>
  <Row>
              <Col>
              <ListGroupItem>
                <b classname="detailsHeader">ID: </b>
                      {this.state.member.id}
                      </ListGroupItem>
                      <ListGroupItem>
                      <b classname="detailsHeader">Imię: </b>
                      {this.state.member.name}
                      </ListGroupItem>
              </Col>
          </Row>
  </div>
  </div>
  );
}
}