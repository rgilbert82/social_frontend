import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMessage } from '../../services/redux/actions';
import { getToken } from '../../services/sessions';
import { getTrashAPI } from '../../services/api/conversations';

class MessagesTrash extends React.Component {
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

    return getTrashAPI(this.props.currentUser.id, token)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ conversations: data.conversations, conversationsLoaded: true });
        }
      }).catch(() => {
        this.props.setMessage({ content: `There was an error retrieving your messages.`, type: 'error' });
      });
  }

  render() {
    const conversations = this.state.conversations.map((conversation) => {
      const path = `/messages/${ conversation.slug }`;

      return (
        <li key={ conversation.id }>
          <div>
            <Link to={ path }>{ conversation.title }</Link>
          </div>
        </li>
      );
    });

    return (
      <div>
        <h1>Trash</h1>
        <Link to='/messages'>Inbox</Link>

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

const component = connect(mapStateToProps, mapDispatchToProps)(MessagesTrash);

export default component;
