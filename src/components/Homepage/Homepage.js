import React from 'react';
import { HomepageLoggedIn, HomepageLoggedOut } from '.';
import { connect } from 'react-redux';

class Homepage extends React.Component {
  render() {
    let template;

    if (this.props.loggedIn) {
      template = <HomepageLoggedIn />
    } else {
      template = <HomepageLoggedOut />
    }

    return (
      <div>
        { template }
      </div>
    );
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
