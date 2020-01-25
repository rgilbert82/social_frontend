import React                    from 'react';
import { connect }              from 'react-redux';
import { AccountFriendRequest } from '.';


class AccountFriendRequests extends React.Component {
  render() {
    let friendRequests;

    if (this.props.currentUser.pending_inverse_friends.length) {
      friendRequests = this.props.currentUser.pending_inverse_friends.map((friend) => {
        return (
          <li key={ friend.id } className='s-account--friend-requests-list-item'>
            <AccountFriendRequest friend={ friend } />
          </li>
        );
      });
    } else {
      friendRequests =
        <li className='s-account--friend-requests-list-item s-account--friend-requests-none'>
          You have no friend requests.
        </li>
    }

    return (
      <div className='s-account'>
        <h1 className='s-account--header'>
          Friend Requests ({ this.props.currentUser.pending_inverse_friends.length })
        </h1>

        <div className='s-account--friend-requests-list'>
          <ul>
            { friendRequests }
          </ul>
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

const component = connect(mapStateToProps)(AccountFriendRequests);

export default component;
