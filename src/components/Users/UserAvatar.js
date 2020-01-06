import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../services/sessions';
import { setMessage } from '../../services/redux/actions';
import { editUserAPI } from '../../services/api/users';
import { defaultAvatar } from '../../services/misc';
import { UserAvatarGrid } from '.';

class UserAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: this.props.user.avatar ? this.props.user.avatar.split(',') : defaultAvatar(),
      editable: false
    };

    this.toggleEditable = this.toggleEditable.bind(this);
    this.updateAvatar   = this.updateAvatar.bind(this);
    this.submitAvatar   = this.submitAvatar.bind(this);
  }

  toggleEditable() {
    this.setState({ editable: !this.state.editable });
  }

  updateAvatar(values) {
    const newAvatar = this.state.avatar.slice(0);

    newAvatar[values.id] = values.color;
    this.setState({ avatar: newAvatar });
  }

  submitAvatar() {
    const token   = getToken();
    const userObj = {
      user: {
        id: this.props.user.id,
        avatar: this.state.avatar.join(',')
      }
    };

    return editUserAPI(userObj, token)
      .then(() => {
        this.setState({ editable: false });
        this.props.setMessage({ content: 'Avatar successfully updated', type: 'success' });
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    const editButtonText = this.state.editable ? 'Cancel' : 'Edit Avatar';
    const editButton   = this.props.isCurrentUser ? <button className='b-btn' onClick={ this.toggleEditable }>{ editButtonText }</button> : null;
    const submitButton = this.props.isCurrentUser & this.state.editable ? <button className='b-btn' onClick={ this.submitAvatar }>Submit</button> : null;

    return (
      <div className='s-user--avatar-wrapper'>
        <UserAvatarGrid avatar={ this.state.avatar } editable={ this.state.editable } updateAvatar={ this.updateAvatar } />
        { submitButton }{ editButton }
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
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(UserAvatar);

export default component;
