import React                         from 'react';
import { ConversationMain }          from '.';
import { Loading, NothingHere }      from '../Misc';
import { connect }                   from 'react-redux';
import { getToken }                  from '../../services/sessions';
import { getConversationAPI }        from '../../services/api/conversations';
import { updateUnreadMessagesCount } from '../../services/redux/actions';


class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: {},
      conversationNotFound: false
    };

    this.fetchConversation = this.fetchConversation.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchConversation();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchConversation();
    }
  }

  fetchConversation() {
    const token = getToken();

    return getConversationAPI(this.props.match.params.slug, token)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ conversation: data.conversation });
          this.props.updateUnreadMessagesCount(data.conversation.unread_messages_count);
        }
      }).catch(() => {
        if (this._isMounted) {
          this.setState({ conversationNotFound: true });
        }
      });
  }

  render() {
    if (this.state.conversation.id) {
      return <ConversationMain conversation={ this.state.conversation } />
    } else if (this.state.conversationNotFound) {
      return <NothingHere />;
    } else {
      return <Loading />;
    }
  }
}


// REDUX ======================================================================

const mapDispatchToProps = (dispatch) => {
  return {
    updateUnreadMessagesCount: (payload) => dispatch(updateUnreadMessagesCount(payload))
  }
};

const component = connect(null, mapDispatchToProps)(Conversation);

export default component;
