import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AccountFriendRequests, AccountMain } from '.';

class Account extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return <div>Please log in</div>
    } else {
      return (
        <div>
          <h1>Account</h1>

          <div>
            <Switch>
              <Route
                exact path='/account'
                key='accountMain'
                render={() => <AccountMain /> }
              />

              <Route
                exact path='/account/friend_requests'
                key='accountFriendRequests'
                render={() => <AccountFriendRequests /> }
              />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    title: state.title,
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    message: state.message
  };
};

const component = connect(mapStateToProps)(Account);

export default component;
