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

    this.appLogin    = this.appLogin.bind(this);
    this.appLogout   = this.appLogout.bind(this);
    this.blinkCursor = this.blinkCursor.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.redirectHomeOnLogout = this.redirectHomeOnLogout.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.blinkCursor();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  blinkCursor() {
    const cursor = document.getElementById('s-header--title--cursor')

    if (this._isMounted) {
      cursor.classList.add('b-hidden');

      setTimeout(() => {
        cursor.classList.remove('b-hidden');

        setTimeout(() => {
          this.blinkCursor();
        }, 1000);
      }, 500);
    }
  }

  appLogin(user) {
    return loginAPI(user)
      .then((data) => {
        setToken(data.user.token);
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data.user });
        this.props.updateUnreadMessagesCount(data.user.unread_messages_count);
        this.props.setMessage({ content: 'You are logged in.', type: 'success' });
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
          this.redirectHomeOnLogout();
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

  toggleDropdown() {
    const dropdown = document.getElementsByClassName('s-header--dropdown')[0]
    dropdown.classList.toggle('s-header--dropdown--open');
  }

  redirectHomeOnLogout() {
    if (!!this.props.location.pathname.match(/\/account|\/messages|\/friends/)) {
      this.props.history.push('/');
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
            <Link to='/account/friend_requests'>Requests ({ this.props.currentUser.pending_inverse_friends.length })</Link>
          </li>
        );
      }

      template =
        <div>
          <div className='s-header--outer'>
            <div className='s-header--inner b-page-width'>
              <div className='s-header--col'>
                <h1 className='s-header--title'>
                  <Link to='/'>{ this.props.title }</Link>
                  <span id='s-header--title--cursor' className='s-header--title--cursor'>&nbsp;</span>
                </h1>
              </div>

              <div className='s-header--col'>
                <div className='s-header--logged-in-name' onClick={ this.toggleDropdown }>
                  { this.props.currentUser.name } <span className='s-header--dropdown-arrow'>▼</span>
                </div>
              </div>
            </div>
          </div>

          <div className='s-header--dropdown' onClick={ this.toggleDropdown }>
            <ul>
              <li>
                <Link to={ userPath }>Profile</Link>
              </li>
              <li>
                <Link to='/friends'>Friends ({ this.props.currentUser.friends.length })</Link>
              </li>
                { pending }
              <li>
                <Link to='/messages'>Messages ({ this.props.unreadMessagesCount })</Link>
              </li>
              <li>
                <Link to='/account'>Account</Link>
              </li>
              <li>
                <span onClick={ this.appLogout }>Log Out</span>
              </li>
            </ul>
          </div>
        </div>
    } else {
      template =
        <div className='s-header--outer'>
          <div className='s-header--inner b-page-width'>
            <div className='s-header--col'>
              <h1 className='s-header--title'>
                <Link to='/'>{ this.props.title }</Link>
                <span id='s-header--title--cursor' className='s-header--title--cursor'>&nbsp;</span>
              </h1>
            </div>

            <div className='s-header--col'>
              <LoginForm submitForm={ this.appLogin } />
            </div>
          </div>
        </div>
    }

    return (
      <header className='s-header'>
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
