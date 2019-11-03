import React from 'react';
import { connect } from 'react-redux';

class Posts extends React.Component {
  render() {
    return (
      <div>
        <h2>Posts</h2>

        <ul>
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
    message: state.message
  };
};

const component = connect(mapStateToProps)(Posts);

export default component;
