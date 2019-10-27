import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../Forms';
import { connect } from 'react-redux';
import { changeCurrentUser, setMessage } from '../../services/redux/actions';
import { loginAPI, logoutAPI } from '../../services/api/sessions';
import { getToken, setToken, deleteToken } from '../../services/sessions';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.appLogin  = this.appLogin.bind(this);
    this.appLogout = this.appLogout.bind(this);
  }

  appLogin(user) {
    return loginAPI(user)
      .then((data) => {
        console.log(data);
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data });
        setToken(data.token);
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
          deleteToken();
        });
    }
  }

  render() {
    let template;

    if (this.props.loggedIn) {
      template =
        <div>
          <Link to='/'><h1>{ this.props.title }!</h1></Link>
          <h2>{ this.props.currentUser.email }</h2>
          <button onClick={ this.appLogout }>Log Out</button>
        </div>
    } else {
      template =
        <div>
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
    title: state.title
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentUser: (payload) => dispatch(changeCurrentUser(payload)),
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(Header);

export default component;
