import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clearMessages} from '../../actions/notifications';

import Notification from './Notification';

//Notification panel container
const NotifyContainer = ({notifications, actions}) => (

  <div className="notifier">
    {notifications.map(notif => {
      return <Notification key={0} message={notif.message} title={notif.title} level={notif.level} clearMessage={actions.clearMessages}/>
    })}
  </div>
);

NotifyContainer.propTypes = {
  notifications: PropTypes.array.isRequired,
  actions: PropTypes.shape({clearMessages: PropTypes.func.isRequired})
};

const mapStateToProps = (state) => {

  const {notifications} = state;
  return {notifications};
};

const mapDispatchToProps = (dispatch) => {

  return {
    actions: bindActionCreators({
      clearMessages
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyContainer);
