import React from 'react';
import { connect } from 'react-redux';
import { Users } from '../Users';

class HomepageLoggedIn extends React.Component {
  render() {
    return (
      <div>
        <h1>Logged In</h1>
        <Users />
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

const component = connect(mapStateToProps)(HomepageLoggedIn);

export default component;
