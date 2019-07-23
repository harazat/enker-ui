import React from 'react';
import PropTypes from 'prop-types';
 import Socket from '../../socket';
import {Container} from 'react-bootstrap';


/**
 * React component to render search page
 */
class Search extends React.Component {
  // constructor() {
    // TODO: set default state of list of users, and text search, event handler and socket connect 
  // }
  constructor(props) {
    super(props);
       this.state = {students: [], search: ""}; 

       
  }
  handleChange(e){
     this.setState({textSearch: e.target.value})
     if(e.target.value.length ==0){
       this.query();
     }
  }
  componentDidMount() {
    // TODO: event handlers if user logged in or out, run query
    this.query();
  
  }
  handleSubmit(event) {
    // TODO: form submit

     event.preventDefault();
     this.query(this.state.textSearch)
  }
  onStudentLoggedIn() {
    // TODO: Socket event handler if user logged in - run query
  }
  onStudentLoggedOut() {
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
       this.setState({students: results})
      });
    });
  }
  render() {
    return (
      <Container className="mt-5">
        <form onSubmit = {e => this.handleSubmit(e)}>
        <input onChange = {e => this.handleChange(e)}  value = {this.state.textSearch}/> 
       <button> Search</button>
        </form>
        <div>TODO: adding page to search for users based on single text field</div>
        {this.state.students.map(element => {
          return (

            <h3> {element.email} {element.loggedIn && <span>Logged In</span>} </h3> 
          )
        })}
      </Container>
    )
  }
}

Search.propTypes = {
  startChat: PropTypes.func,
  currentUser: PropTypes.object,
};
export default Search;