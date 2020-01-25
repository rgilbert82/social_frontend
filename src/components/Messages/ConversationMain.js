import React                   from 'react';
import { Link }                from 'react-router-dom';
import { Redirect }            from 'react-router-dom';
import { AddMessage, Message } from '.';
import { connect }             from 'react-redux';
import { getToken }            from '../../services/sessions';
import { setMessage }          from '../../services/redux/actions';
import { editConversationAPI } from '../../services/api/conversations';


class ConversationMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inTrash: false,
      messages: this.props.conversation.messages.slice(0),
      redirect: false
    };

    this.addMessage           = this.addMessage.bind(this);
    this.moveMessage          = this.moveMessage.bind(this);
    this.determineInboxStatus = this.determineInboxStatus.bind(this);
  }

  componentDidMount() {
    this.determineInboxStatus();
  }

  addMessage(message) {
    this.setState({ messages: [message].concat(this.state.messages) });
  }

  moveMessage() {
    const token       = getToken();
    const isSender    = this.props.conversation.sender.id === this.props.currentUser.id;
    const isRecipient = this.props.conversation.recipient.id === this.props.currentUser.id;
    const senderTrash = isSender ? !this.props.conversation.sender_trash : this.props.conversation.sender_trash;
    const recipientTrash  = isRecipient ? !this.props.conversation.recipient_trash : this.props.conversation.recipient_trash;
    const conversationObj = {
      conversation: {
        id: this.props.conversation.id,
        sender_trash: senderTrash,
        recipient_trash: recipientTrash
      }
    };

    return editConversationAPI(conversationObj, token)
      .then((data) => {
        this.setState({ redirect: true });
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  determineInboxStatus() {
    if ((this.props.conversation.sender_trash &&
         this.props.conversation.sender.id === this.props.currentUser.id) ||
        (this.props.conversation.recipient_trash &&
         this.props.conversation.recipient.id === this.props.currentUser.id)) {

          this.setState({ inTrash: true });
    }
  }

  render() {
    const messages = this.state.messages.map((message) => {
      return (
        <li key={ message.id } className='s-messages--conversation-list-item'>
          <Message message={ message } />
        </li>
      );
    });

    let otherUser;
    let otherUserPath;

    if (this.props.currentUser.id !== this.props.conversation.sender.id) {
      otherUser = this.props.conversation.sender;
    } else {
      otherUser = this.props.conversation.recipient;
    }

    otherUserPath = `/users/${ otherUser.slug }`;

    if (this.state.redirect) {
      return <Redirect to='/messages' />
    } else {
      return (
        <div className='s-messages'>
          <div className='s-messages--header'>
            <h1>{ this.props.conversation.title }</h1>
            <span>with: <Link to={ otherUserPath }>{ otherUser.name }</Link></span>
          </div>

          <div className='s-messages--add-message'>
            <AddMessage addMessage={ this.addMessage } conversationId={ this.props.conversation.id } recipientId={ otherUser.id } />
          </div>

          <div className='s-messages--conversations-list'>
            <ul>
              { messages }
            </ul>
          </div>

          <div className='s-messages--move-conversation'>
            <button
              className='b-form--btn b-btn'
              onClick={ this.moveMessage }>
              Move conversation to { this.state.inTrash ? 'Inbox' : 'Trash' }
            </button>
          </div>
        </div>
      );
    }
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

const component = connect(mapStateToProps, mapDispatchToProps)(ConversationMain);

export default component;
