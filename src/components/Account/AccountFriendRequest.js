import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken } from '../../services/sessions';
import { changeCurrentUser, setMessage } from '../../services/redux/actions';
import { confirmFriendshipAPI, deleteFriendshipAPI } from '../../services/api/friendships';

class AccountFriendRequest extends React.Component {
  constructor(props) {
    super(props);

    this.acceptFriendRequest  = this.acceptFriendRequest.bind(this);
    this.declineFriendRequest = this.declineFriendRequest.bind(this);
  }

  acceptFriendRequest() {
    const token = getToken();
    const data  = {
      friendship: {
        user_id: this.props.currentUser.id,
        friend_id: this.props.friend.id
      }
    };

    return confirmFriendshipAPI(data, token)
      .then((data) => {
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data.user });
      }).catch(() => {
        this.props.setMessage('There was an error accepting the friendship request.');
      });
  }

  declineFriendRequest() {
    const token = getToken();
    const data  = {
      friendship: {
        user_id: this.props.currentUser.id,
        friend_id: this.props.friend.id
      }
    };

    return deleteFriendshipAPI(data, token)
      .then((data) => {
        this.props.changeCurrentUser({ loggedIn: true, currentUser: data.user });
      }).catch(() => {
        this.props.setMessage('There was an error declining the friendship request.');
      });
  }

  render() {
    const userPath = `/users/${ this.props.friend.slug }`;

    return (
      <div>
        <h3>
          <Link to={ userPath }>{ this.props.friend.name }</Link>
          <button onClick={ this.acceptFriendRequest }>Accept Friend Request</button>
          <button onClick={ this.declineFriendRequest }>Decline Friend Request</button>
        </h3>
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
    changeCurrentUser: (payload) => dispatch(changeCurrentUser(payload)),
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(AccountFriendRequest);

export default component;
