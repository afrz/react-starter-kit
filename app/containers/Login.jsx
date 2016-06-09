import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../components/common/LoginForm';
import { loginUser, loadInstances } from '../actions/auth';

const mapStateToProps = (state) => {

  const { session, instances } = state;
  return {
    defaultLogin: session.user,
    defaultInstance: session.instance || state.config.instance.code,
    lockInstance: state.config.instance.lock,
    errorMessage: session.error,
    instances
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    actions: bindActionCreators({ loginUser, loadInstances }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
