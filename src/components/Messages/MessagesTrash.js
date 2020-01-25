import React           from 'react';
import { Link }        from 'react-router-dom';
import { connect }     from 'react-redux';
import { getToken }    from '../../services/sessions';
import { setMessage }  from '../../services/redux/actions';
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
    let conversations = this.state.conversations.map((conversation) => {
      const path = `/messages/${ conversation.slug }`;
      const hasUnread = (this.props.currentUser.id === conversation.sender_id && conversation.has_unread_sender_messages) ||
                        (this.props.currentUser.id === conversation.recipient_id && conversation.has_unread_recipient_messages);
      const unreadClass = hasUnread ? 's-messages--unread' : null;
      const unreadBadge = hasUnread ? <span>[unread]</span> : null;

      return (
        <li key={ conversation.id } className={ `s-messages--conversation-list-item ${ unreadClass }` }>
          <div className='s-messages--conversation-list-item--inner'>
            <Link to={ path }>{ conversation.title }</Link>
            { unreadBadge }
          </div>
        </li>
      );
    });

    if (!conversations.length) {
      conversations = <div className='b-single-message'>No Messages</div>
    }

    return (
      <div className='s-messages--trash'>
        <div className='s-messages--header'>
          <h1>Trash</h1>
          <div className='s-messages--folder-link'>
            <Link to='/messages'>Inbox</Link>
          </div>
        </div>

        <div className='s-messages--conversations-list'>
          <ul>
            { conversations }
          </ul>
        </div>
      </div>
    );
  }
}


// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
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
