import React from 'react';
import { AccountFriendRequest } from '.';
import { connect } from 'react-redux';

class AccountFriendRequests extends React.Component {
  render() {
    let friendRequests;

    if (this.props.pending_inverse_friends.length) {
      friendRequests = this.props.pending_inverse_friends.map((friend) => {
        return (
          <li key={ friend.id }>
            <AccountFriendRequest friend={ friend } />
          </li>
        );
      });
    } else {
      friendRequests = <li>You have no friend requests.</li>
    }

    return (
      <div>
        <h2>Friend Requests: { this.props.pending_inverse_friends.length }</h2>

        <ul>
          { friendRequests }
        </ul>
      </div>
    );
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    friends: state.friends,
    pending_friends: state.pending_friends,
    pending_inverse_friends: state.pending_inverse_friends,
    message: state.message
  };
};

const component = connect(mapStateToProps)(AccountFriendRequests);

export default component;
