import React from 'react';
import { Header, Main } from '.';
import { Background, Notification } from '../Misc';
import { connect } from 'react-redux';
import { changeCurrentUser, updateUnreadMessagesCount } from '../../services/redux/actions';
import { getCurrentUserAPI } from '../../services/api/sessions';
import { getToken, setToken, deleteToken } from '../../services/sessions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.fetchCurrentUser = this.fetchCurrentUser.bind(this);
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    if (this.props.loggedIn) { return; }

    const token = getToken();
    let payload = { loggedIn: false, currentUser: {} };

    if (token) {
      return getCurrentUserAPI(token)
        .then((data) => {
          payload = { loggedIn: true, currentUser: data.user };
          this.props.changeCurrentUser(payload);
          this.props.updateUnreadMessagesCount(data.user.unread_messages_count);
          setToken(token);
        }).catch(() => {
          this.props.changeCurrentUser(payload);
          this.props.updateUnreadMessagesCount(0);
          deleteToken();
        });
    } else {
      this.props.changeCurrentUser(payload);
    }
  }

  render() {
    let notification;

    if (!!this.props.message.content) {
      notification = <Notification />
    }

    return (
      <div>
        <Background />
        <Header {...this.props} />
        <Main {...this.props} />
        { notification }
        <footer>© Friendbook 1984</footer>
      </div>
    );
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
    changeCurrentUser: (payload) => dispatch(changeCurrentUser(payload)),
    updateUnreadMessagesCount: (payload) => dispatch(updateUnreadMessagesCount(payload))
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export default component;
