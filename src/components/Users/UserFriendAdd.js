import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../services/sessions';
import { setMessage, updateFriends } from '../../services/redux/actions';
import { updateFriendshipStatusAPI } from '../../services/api/friendships';

class UserFriendAdd extends React.Component {
  constructor(props) {
    super(props);
    this.updateFriendship = this.updateFriendship.bind(this);
  }

  updateFriendship() {
    const token = getToken();
    const data  = {
      friendship: {
        user_id: this.props.currentUserId,
        friend_id: this.props.friendId
      }
    }

    return updateFriendshipStatusAPI(data, token)
      .then((data) => {
        this.props.updateFriends(data);
      }).catch(() => {
        this.props.setMessage('There was an error updating the friendship.');
      });
  }

  render() {
    let buttonText = 'Add Friend';

    if (this.props.isFriend) {
      buttonText = 'Un-friend';
    }

    return <button onClick={ this.updateFriendship }>{ buttonText }</button>;
  }
}

// REDUX ======================================================================

const mapDispatchToProps = (dispatch) => {
  return {
    updateFriends: (payload) => dispatch(updateFriends(payload)),
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(null, mapDispatchToProps)(UserFriendAdd);

export default component;
