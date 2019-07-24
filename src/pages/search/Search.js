import React from 'react';
import PropTypes from 'prop-types';
 import Socket from '../../socket';
// import {Container} from 'react-bootstrap';
import { InputGroup, InputGroupAddon, Badge, ListGroup, Tab, Form, Button, Container, Col, Row } from 'react-bootstrap';

/**
 * React component to render search page
 */
class Search extends React.Component {
  // constructor() {
    // TODO: set default state of list of users, and text search, event handler and socket connect 
  // }
  constructor(props) {
    super(props);
       this.state = {studentsList: [], search: ""}; 

       
  }
  handleChange(e){
     this.setState({textSearch: e.target.value})
     if(e.target.value.length ===0){
       this.query();
     }
  }
  componentDidMount() {
    // TODO: event handlers if user logged in or out, run query
    this.onStudentLoggedIn();
    this.onStudentLoggedOut();
    this.query();
  }
  componentWillReceiveProps(nextProps){
    this.query();
  }
  handleSubmit(event) {
    // TODO: form submit
    // const searchText = ReactDOM.findDOMNode(this.refs.searchTextRef).value; // different put in slides
   
     event.preventDefault();
     this.query(this.state.textSearch)
  }
  onStudentLoggedIn() {
    // Socket.users.on('logged in', user => {
    //   this.query(this.state.textSearch);
    // });
    // TODO: Socket event handler if user logged in - run query
  }
  onStudentLoggedOut() {
    // Socket.users.on('logged out', user => {
    //   this.query(this.state.textSearch);
    // });
    // TODO: Socket event handler if user logged out - run query
  }
  onstartChat(withUser) {
    // TODO: event to invoke start-chat action via Socket, redirect to /network page
  }
  query(textSearch) {
    // TODO: emit query via Socket based on text
    Socket.connect(user => {
      user.emit("textSearch", textSearch, results=> {
        console.log(results);
        const {currentUser} = this.props;
        if(currentUser) results = results.filter(e => e.email !== currentUser.email)
       this.setState({studentsList: results})
      });
    });
  }
  render() {
    return (
      // <Container className="mt-5">
      //   <form onSubmit = {e => this.handleSubmit(e)}>
      //   <input onChange = {e => this.handleChange(e)}  value = {this.state.textSearch}/> 
      //  <button> Search</button>
      //   </form>
      //   <div>TODO: adding page to search for users based on single text field</div>
      //   {this.state.students.map(element => {
      //     return (

      //       <h3> {element.email} {element.loggedIn && <span>Logged In</span>} </h3> 
      //     )
      //   })}
      // </Container>
      <Container className="mt-5">
        <Row>
          <Col lg={8} md={10} sm={12}>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Group>
                <InputGroup size="lg" className="mb-3">
                  <Form.Control onChange={e => this.handleChange(e)} value={this.state.textSearch} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                  <InputGroup.Append>
                    <Button type='submit' variant='outline-primary'>Search</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Tab.Container id="search-results" defaultActiveKey="#user0">
            <Col>
              <ListGroup>
                {this.state.studentsList.map((user, index) => (
                  <ListGroup.Item
                    eventKey={`#user${index}`}
                    as="button"
                  >
                    <span>{user.firstName} {user.lastName}</span>
                    {user.loggedIn ? <Badge className="ml-2" variant="success">Online</Badge> : null}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <Tab.Content>
                {this.state.studentsList.map((user, index) => (
                  <Tab.Pane eventKey={`#user${index}`}>
                    <div>Name: {user.firstName} {user.lastName}</div>
                    <div>Email: {user.email}</div>
                    <div>Learning Targets: {user.learningTargets.join(', ')}</div>
                    <div>Location: {user.location}</div>
                    <Button className="mt-3" onClick={(e) => { e.preventDefault(); this.onstartChat(user) }}>Start Chat</Button>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
      
    );
  }
}

Search.propTypes = {
  startChat: PropTypes.func,
  currentUser: PropTypes.object,
};
export default Search;