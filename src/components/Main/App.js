import React from 'react';
import { Header, Main } from '.';
import { Message } from '../Misc';
import { connect } from 'react-redux';
import { changeCurrentUser } from '../../services/redux/actions';
import { getCurrentUserAPI } from '../../services/api/sessions';
import { getToken, setToken, deleteToken } from '../../services/sessions';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.fetchCurrentUser = this.fetchCurrentUser.bind(this);
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    const token = getToken();
    let payload = { loggedIn: false, currentUser: {} };

    if (token) {
      return getCurrentUserAPI(token)
        .then((data) => {
          payload = { loggedIn: true, currentUser: data };
          this.props.changeCurrentUser(payload);
          setToken(token);
        }).catch(() => {
          this.props.changeCurrentUser(payload);
          deleteToken();
        });
    } else {
      this.props.changeCurrentUser(payload);
    }
  }

  render() {
    let message;

    if (!!this.props.message.content) {
      message = <Message />
    }

    return (
      <div>
        <Header />
        <Main />
        { message }
      </div>
    );
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    title: state.title,
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentUser: (payload) => dispatch(changeCurrentUser(payload))
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export default component;
