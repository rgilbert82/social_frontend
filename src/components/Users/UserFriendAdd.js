import React        from 'react';
import { connect }  from 'react-redux';
import { getToken } from '../../services/sessions';
import { updateFriendshipStatusAPI }     from '../../services/api/friendships';
import { changeCurrentUser, setMessage } from '../../services/redux/actions';


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
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data.user });
      }).catch(() => {
        this.props.setMessage({
          content: 'There was an error updating the friendship.',
          type: 'error'
        });
      });
  }

  render() {
    let buttonText = 'Add Friend';

    if (this.props.isFriend) {
      buttonText = 'Un-friend';
    }

    return <button className='b-btn s-user--friend-add' onClick={ this.updateFriendship }>{ buttonText }</button>;
  }
}


// REDUX ======================================================================

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentUser: (payload) => dispatch(changeCurrentUser(payload)),
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(null, mapDispatchToProps)(UserFriendAdd);

export default component;
