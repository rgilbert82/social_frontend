import React from 'react';
import { HomepageLoggedIn, HomepageLoggedOut } from '.';
import { connect } from 'react-redux';

class Homepage extends React.Component {
  render() {
    if (this.props.loggedIn) {
      return <HomepageLoggedIn />
    } else {
      return <HomepageLoggedOut />
    }
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const component = connect(mapStateToProps)(Homepage);

export default component;
