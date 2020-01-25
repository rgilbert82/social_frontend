import React from 'react';
import { UsersMain } from '.';
import { connect } from 'react-redux';


class Friends extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return <div className='b-single-message'>Please log in</div>
    } else {
      return (
        <div className='s-users--page'>
          <h1 className='s-users--header'>Friends</h1>
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
