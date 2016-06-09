import React, {PropTypes} from 'react';

import Alert from 'react-bootstrap/lib/Alert';

//Notification toaster
const Notification = ({message, title, level, clearMessage}) => (

  <Alert bsStyle={level} onDismiss={() => clearMessage()}>
    {title
      ? <h4>{title}</h4>
      : null}
    <p>{message}</p>
  </Alert>
);

Notification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired
};

export default Notification;
