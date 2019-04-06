import React from 'react';
import { Container, Row, Col, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';
import './style.css'
import MembersList from '../members_list/index';

export default class MemberDetails extends React.Component{

  constructor()
  {
      super();
      this.state = {
          member: {id: 5, name: "Adam", surname: "Kowalski", email: "sample@mail.com", address: "Wrocław, Plac Grunwaldzki"},
          member2: {id: 1, name: "Krzys", surname: "Nowak", email: "sample2@mail.com", address: "Wrocław, Plac Grunwaldzki"}
      };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.state.member.id) {
      this.getMemberDetails(nextProps.match.params.id);
    }
  }

  componentDidMount() {
    console.log("jest")
    this.getMemberDetails();
}

getMemberDetails(nextProps = this.props.match.params.id ) {
 this.setState(prevState => ({
  member: {
    ...prevState.member,
    id: nextProps
  }
 }));
}


// renderMemberDetails(){
//   console.log("DUPADUPA");
//   return(

//   )
// }

  render() {

  return (
    <div id="Page">
  
  <div id="Members">
  <MembersList/>
  </div>
  <div id="MemberDetails">
<h2>Szczegóły o użytkowniku:</h2>
  <Row>
              <Col>
              <ListGroupItem>
                <b className="detailsHeader">ID: </b>
                      {this.state.member.id}
                      </ListGroupItem>
                      <ListGroupItem>
                      <b className="detailsHeader">Imię: </b>
                      {this.state.member.name}
                      </ListGroupItem>
              </Col>
          </Row>
  </div>
  </div>
  );
}
}