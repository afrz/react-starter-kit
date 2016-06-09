import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//UI components
import Login from './Login';
import Workspace from '../components/common/Workspace';
//actions
import { logoutUser } from '../actions/auth';

const mapStateToProps = (state) => {

  return {
    auth : state.session.auth,
    user : state.session.user,
    settings : state.settings,
    info : {
      unreadMessages : 0
    },
    paths : {
      images : '/images/',
      iconography : `/iconography/${state.session.instance}/`
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators({ logoutUser }, dispatch)
  };
};

//create application : restricted workspace
const App = Workspace(Login);
export default connect(mapStateToProps, mapDispatchToProps)(App);
