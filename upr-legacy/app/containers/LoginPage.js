import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginPage from '../components/Login/LoginPage';
import * as SessionActions from '../actions/SessionActions';

function mapStateToProps(state) {
  return {
    Session: state.Session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SessionActions: bindActionCreators(SessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
