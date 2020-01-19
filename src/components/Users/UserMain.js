import React from 'react';
import { Posts } from '../Posts';
import { UserAvatar, UserFriendAdd } from '.';
import { NewConversation } from '../Messages';
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
    let startConversation;

    if (this.state.isPendingFriend) {
      friendButton = <span className='s-user--friendship-pending'>Friendship Pending</span>;
    } else if (this.props.loggedIn && !this.state.isCurrentUser) {
      friendButton = <UserFriendAdd
        currentUserId={ this.props.currentUser.id }
        friendId={ this.props.user.id }
        isFriend={ this.state.isFriend }
      />
    }

    if (this.props.loggedIn && !this.state.isCurrentUser) {
      startConversation =
        <div className='s-user--new-conversation'>
          <NewConversation user={ this.props.user } />
        </div>;
    }

    return (
      <div className='s-user'>
        <div className='s-user--header b-clearfix'>
          <div className='s-user--header-col'>
            <UserAvatar user={ this.props.user } isCurrentUser={ this.state.isCurrentUser }/>
          </div>

          <div className='s-user--header-col'>
            <div className='s-user--header--name'>
              <h1>{ this.props.user.name }</h1>
              { friendButton  }
            </div>

            <div>
              { this.props.user.location ?
                <div className='s-user--header--location'>Location: { this.props.user.location }</div>
                : null
              }

              { this.props.user.birthday ?
                <div className='s-user--header--birthday'>Birthday: { this.props.user.birthday.split('T')[0] }</div>
                : null
              }

              { this.props.user.tagline ?
                <div className='s-user--header--tagline'>{ this.props.user.tagline }</div>
                : null
              }

              { this.props.user.description ?
                <div className='s-user--header--description'>{ this.props.user.description }</div>
                : null
              }
            </div>
          </div>
        </div>

        { startConversation }

        <div className='s-user--posts'>
          <Posts userStatus={ this.state } user={ this.props.user } />
        </div>
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
