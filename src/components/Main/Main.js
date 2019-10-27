import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Homepage } from '../Homepage';
import { NothingHere } from '../Misc';
import { connect } from 'react-redux';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/'
            render={() => <Homepage /> }
          />

          <Route
            path='/*'
            render={ () => <NothingHere /> }
          />
        </Switch>
      </div>
    );
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  };
};

const component = connect(mapStateToProps)(Main);

export default component;
