import { connect } from 'react-redux'

import Profile from './Profile';

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
