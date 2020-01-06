import React from 'react';
import { Route } from 'react-router-dom';
import { Account } from '../Account';
import { Homepage } from '../Homepage';
import { Messages } from '../Messages';
import { Friends, User, Users } from '../Users';
import { AnimatedSwitch, NothingHere } from '../Misc';


export default class Main extends React.Component {

  render() {
    return (
      <div className='s-main b-page-width'>
        <AnimatedSwitch { ...this.props }>
          <Route
            exact path='/'
            key={ `${this.props.location.pathname} - ${ this.props.loggedIn }` }
            render={() => <Homepage /> }
          />

          <Route
            path='/account'
            key={ `${this.props.location.pathname} - ${ this.props.loggedIn }` }
            render={() => <Account /> }
          />

          <Route
            path='/friends'
            key={ `${this.props.location.pathname} - ${ this.props.loggedIn }` }
            render={() => <Friends /> }
          />

          <Route
            path='/messages'
            key={ `${this.props.location.pathname} - ${ this.props.loggedIn }` }
            render={() => <Messages /> }
          />

          <Route
            exact path='/users'
            key={ `${this.props.location.pathname} - ${ this.props.loggedIn }` }
            render={() => <Users /> }
          />

          <Route
            exact path='/users/:slug'
            key={ `${this.props.location.pathname} - ${ this.props.loggedIn }` }
            render={(props) => <User { ...props } /> }
          />

          <Route
            path='/*'
            key={ `${this.props.location.pathname} - ${ this.props.loggedIn }` }
            render={ () => <NothingHere /> }
          />
        </AnimatedSwitch>
      </div>
    );
  }
}
