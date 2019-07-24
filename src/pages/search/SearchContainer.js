import { connect } from 'react-redux'

import Search from './Search';

const mapStateToProps = state => ({
  currentUser: state.user.data,
  userError: state.user.error
})

const mapDispatchToProps = dispatch => ({
  // TODO: action to start chat
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);