import React           from 'react';
import { connect }     from 'react-redux';
import { getToken }    from '../../services/sessions';
import { setMessage }  from '../../services/redux/actions';
import { editUserAPI } from '../../services/api/users';
import { UserForm }    from '../Forms';


class AccountMain extends React.Component {
  constructor(props) {
    super(props);
    this.submitUpdates = this.submitUpdates.bind(this);
  }

  submitUpdates(user) {
    const token   = getToken();
    const userObj = {
      user: user
    };

    return editUserAPI(userObj, token)
      .then(() => {
        this.props.setMessage({ content: 'Profile successfully updated', type: 'success' });
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return (
      <div className='s-account'>
        <div className='s-account--header'>
          <h1>Edit Account</h1>
        </div>

        <div className='s-account--user-form'>
          <UserForm currentUser={ this.props.currentUser } submitForm={ this.submitUpdates } />
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

const component = connect(mapStateToProps, mapDispatchToProps)(AccountMain);

export default component;
