import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../services/sessions';
import { setMessage } from '../../services/redux/actions';
import { createConversationAPI } from '../../services/api/conversations';
import { ConversationForm } from '../Forms';

class NewConversation extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(conv) {
    const token = getToken();
    const conversationObj = {
      conversation: {
        title: conv.title,
        sender_id: this.props.currentUser.id,
        recipient_id: this.props.user.id,
      },
      message: {
        body: conv.body,
        user_id: this.props.currentUser.id,
        recipient_id: this.props.user.id
      }
    };

    return createConversationAPI(conversationObj, token)
      .then((data) => {
        this.props.setMessage({ content: 'Your message has been sent.', type: 'success' });
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return (
      <div>
        <h2>Send Message</h2>
        <ConversationForm submitForm={ this.submitForm } />;
      </div>
    );
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(NewConversation);

export default component;
