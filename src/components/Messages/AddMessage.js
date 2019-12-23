import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../services/sessions';
import { setMessage } from '../../services/redux/actions';
import { createMessageAPI } from '../../services/api/conversations';
import { MessageForm } from '../Forms';

class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(message) {
    const token = getToken();
    const messageObj = {
      message: {
        body: message,
        user_id: this.props.currentUser.id,
        recipient_id: this.props.recipientId,
        conversation_id: this.props.conversationId
      }
    };

    return createMessageAPI(messageObj, token)
      .then((data) => {
        this.props.addMessage(data.message);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return <MessageForm submitForm={ this.submitForm } />;
  }
}


// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(AddMessage);

export default component;
