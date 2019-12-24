import React from 'react';
import { connect } from 'react-redux';
import { UsersMain } from '.';

class Friends extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return <div>Please log in</div>
    } else {
      return (
        <div>
          <h1>Friends</h1>
          <UsersMain users={ this.props.currentUser.friends } />
        </div>
      );
    }
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  };
};

const component = connect(mapStateToProps)(Friends);

export default component;
