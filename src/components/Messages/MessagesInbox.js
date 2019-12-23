import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMessage } from '../../services/redux/actions';
import { getToken } from '../../services/sessions';
import { getInboxAPI } from '../../services/api/conversations';

class MessagesInbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      conversationsLoaded: false
    };

    this.fetchConversations = this.fetchConversations.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchConversations();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchConversations() {
    const token = getToken();

    return getInboxAPI(this.props.currentUser.id, token)
      .then((data) => {
        if (this._isMounted) {
          console.log('INBOX');
          console.log(data);
          this.setState({ conversations: data.conversations, conversationsLoaded: true });
        }
      }).catch(() => {
        this.props.setMessage({ content: `There was an error retrieving your messages.`, type: 'error' });
      });
  }

  render() {
    const conversations = this.state.conversations.map((conversation) => {
      const path = `/messages/${ conversation.slug }`;
      const hasUnread = (this.props.currentUser.id === conversation.sender_id && conversation.has_unread_sender_messages) ||
                        (this.props.currentUser.id === conversation.recipient_id && conversation.has_unread_recipient_messages);
      const unreadClass = hasUnread ? <span>[Unread]</span> : null;

      return (
        <li key={ conversation.id }>
          <div>
            <Link to={ path }>{ conversation.title }</Link>
            { unreadClass }
          </div>
        </li>
      );
    });

    return (
      <div>
        <h1>Inbox</h1>
        <Link to='/messages/trash'>Trash</Link>

        <ul>
          { conversations }
        </ul>
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

const component = connect(mapStateToProps, mapDispatchToProps)(MessagesInbox);

export default component;
