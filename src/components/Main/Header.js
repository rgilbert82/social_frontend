import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../Forms';
import { connect } from 'react-redux';
import { changeCurrentUser, setMessage, updateUnreadMessagesCount } from '../../services/redux/actions';
import { loginAPI, logoutAPI } from '../../services/api/sessions';
import { getToken, setToken, deleteToken } from '../../services/sessions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.appLogin  = this.appLogin.bind(this);
    this.appLogout = this.appLogout.bind(this);
  }

  componentDidUpdate() {
    console.log('PROPS');
    console.log(this.props);
  }

  appLogin(user) {
    return loginAPI(user)
      .then((data) => {
        setToken(data.user.token);
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data.user });
        this.props.updateUnreadMessagesCount(data.user.unread_messages_count);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  appLogout() {
    const token   = getToken();
    const payload = { loggedIn: false, currentUser: {} };

    if (token) {
      return logoutAPI(token)
        .then(() => {
          this.props.changeCurrentUser(payload);
          this.props.setMessage({ content: 'You have logged out.', type: 'success' });
          deleteToken();
        }).catch(() => {
          this.props.changeCurrentUser(payload);
          this.props.updateUnreadMessagesCount(0);
          deleteToken();
        });
    }
  }

  render() {
    let template;
    let userPath;
    let pending;

    if (this.props.loggedIn) {
      userPath = `/users/${ this.props.currentUser.slug }`;

      if (this.props.currentUser.pending_inverse_friends.length) {
        pending = (
          <li>
            Friend Requests: <Link to='/account/friend_requests'>{ this.props.currentUser.pending_inverse_friends.length }</Link>
          </li>
        );
      }

      template =
        <div className='b-page-width'>
          <Link to='/'><h1>{ this.props.title }</h1></Link>
          <ul>
            <li>
              <Link to={ userPath }>Profile</Link>
            </li>
            <li>
              <Link to='/friends'>Friends({ this.props.currentUser.friends.length })</Link>
            </li>
            <li>
              <Link to='/messages'>Messages ({ this.props.unreadMessagesCount })</Link>
            </li>
            <li>
              <Link to='/account'>Account</Link>
            </li>
            { pending }
            <li>
              <button onClick={ this.appLogout }>Log Out</button>
            </li>
          </ul>
        </div>
    } else {
      template =
        <div className='b-page-width'>
          <Link to='/'><h1>{ this.props.title }</h1></Link>
          <LoginForm submitForm={ this.appLogin } />
        </div>
    }

    return (
      <header>
        { template }
      </header>
    );
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    title: state.title,
    unreadMessagesCount: state.unreadMessagesCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentUser: (payload) => dispatch(changeCurrentUser(payload)),
    setMessage: (payload) => dispatch(setMessage(payload)),
    updateUnreadMessagesCount: (payload) => dispatch(updateUnreadMessagesCount(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(Header);

export default component;
