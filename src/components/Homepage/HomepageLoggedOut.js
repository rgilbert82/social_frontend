import React from 'react';
import { RegistrationForm } from '../Forms';
import { connect } from 'react-redux';
import { changeCurrentUser, setMessage } from '../../services/redux/actions';
import { createUserAPI } from '../../services/api/users';
import { setToken } from '../../services/sessions';
import { Users } from '../Users';

class HomepageLoggedOut extends React.Component {
  constructor(props) {
    super(props);

    this.userSignup = this.userSignup.bind(this);
  }

  userSignup(user) {
    return createUserAPI(user)
      .then((data) => {
        console.log('NEW USER');
        console.log(data);
        setToken(data.user.token);
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data.user });
        this.props.setMessage({ content: 'Thanks for signing up!', type: 'success' });
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return (
      <div className='s-homepage'>
        <div className='s-homepage--signup'>
          <h1 className='s-homepage--signup--title'>Create Account</h1>
          <RegistrationForm submitForm={ this.userSignup } />
        </div>

        <Users />
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
