import React from 'react';
import { Container, Row, Col, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import './style.css';

 class MembersList extends React.Component{

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
              <Col >
                  <ListGroupItem>
                      {member}
                      </ListGroupItem>
              </Col>
          </Row>
  )
}


  render() {
    const members = _.map(this.state.members, (member, k) => {
        return this.renderItem(member, k);
    });

    return (
    <div id="MembersList">
    <h1>Lista użytkowników:</h1>
     {members}
    </div>
    );
}
}

export default withRouter(MembersList);