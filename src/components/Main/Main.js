import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Account } from '../Account';
import { Homepage } from '../Homepage';
import { Messages } from '../Messages';
import { User, Users } from '../Users';
import { NothingHere } from '../Misc';

export default class Main extends React.Component {
  render() {
    return (
      <div className='b-page-width'>
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
            path='/messages'
            key='messages'
            render={() => <Messages /> }
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
