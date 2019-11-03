import React from 'react';
import { RegistrationForm } from '../Forms';
import { connect } from 'react-redux';
import { changeCurrentUser, setMessage } from '../../services/redux/actions';
import { createUserAPI } from '../../services/api/users';
import { setToken } from '../../services/sessions';

class HomepageLoggedOut extends React.Component {
  constructor(props) {
    super(props);

    this.userSignup = this.userSignup.bind(this);
  }

  userSignup(user) {
    return createUserAPI(user)
      .then((data) => {
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data });
        this.props.setMessage({ content: 'Thanks for signing up!', type: 'success' });
        setToken(data.token);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return (
      <div>
        <h1>Create An Account</h1>
        <RegistrationForm submitForm={ this.userSignup } />
      </div>
    );
  }
}

// REDUX ======================================================================

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentUser: (payload) => dispatch(changeCurrentUser(payload)),
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(null, mapDispatchToProps)(HomepageLoggedOut);

export default component;
