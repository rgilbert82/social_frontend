import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Account } from '../Account';
import { Homepage } from '../Homepage';
import { User, Users } from '../Users';
import { NothingHere } from '../Misc';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact path='/'
            key='homepage'
            render={() => <Homepage /> }
          />

          <Route
            path='/account'
            key='account'
            render={() => <Account /> }
          />

          <Route
            exact path='/users'
            key='users'
            render={() => <Users /> }
          />

          <Route
            exact path='/users/:slug'
            key='users'
            render={(props) => <User { ...props } /> }
          />

          <Route
            path='/*'
            key='Not Found'
            render={ () => <NothingHere /> }
          />
        </Switch>
      </div>
    );
  }
}
