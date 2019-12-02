import React from 'react';
import { Posts } from '../Posts';
import { UserFriendAdd } from '.';
import { connect } from 'react-redux';

class UserMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentUser: false,
      isFriend: false,
      isPendingFriend: false
    };

    this.resetState = this.resetState.bind(this);
    this.checkIfFriend = this.checkIfFriend.bind(this);
    this.checkIfCurrentUser = this.checkIfCurrentUser.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.checkIfCurrentUser();
      this.checkIfFriend();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.loggedIn) {
        this.checkIfCurrentUser();
        this.checkIfFriend();
      } else {
        this.resetState();
      }
    }
  }

  checkIfCurrentUser() {
    if (this.props.currentUser.id === this.props.user.id) {
      this.setState({ isCurrentUser: true });
    }
  }

  resetState() {
    this.setState({
      isCurrentUser: false,
      isFriend: false,
      isPendingFriend: false
    });
  }

  checkIfFriend() {
    const isFriend = !!this.props.currentUser.friends.filter((friend) => {
      return friend.id === this.props.user.id;
    }).length;

    const isPendingFriend = !!this.props.currentUser.pending_friends.filter((friend) => {
      return friend.id === this.props.user.id;
    }).length;

    const isPendingInverseFriend = !!this.props.currentUser.pending_inverse_friends.filter((friend) => {
      return friend.id === this.props.user.id;
    }).length;

    if (!this.state.isCurrentUser && isFriend ) {
      this.setState({ isFriend: true });
    } else if (!this.state.isCurrentUser && (isPendingFriend || isPendingInverseFriend)) {
      this.setState({ isPendingFriend: true });
    } else {
      this.setState({
        isFriend: false,
        isPendingFriend: false
      });
    }
  }

  render() {
    let friendButton;

    if (this.state.isCurrentUser) {
      friendButton = <span>Current User</span>;
    } else if (this.state.isPendingFriend) {
      friendButton = <span>Friendship Pending</span>;
    } else if (this.props.loggedIn){
      friendButton = <UserFriendAdd
        currentUserId={ this.props.currentUser.id }
        friendId={ this.props.user.id }
        isFriend={ this.state.isFriend }
      />
    }

    return (
      <div>
        <div>
          <h1>{ this.props.user.name }</h1>
          <h2>{ this.props.user.email }</h2>
          { friendButton }
        </div>

        <Posts userStatus={ this.state } user={ this.props.user } />
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

const component = connect(mapStateToProps)(UserMain);

export default component;
