import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AccountFriendRequests, AccountMain } from '.';


class Account extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return <div className='b-single-message'>Please log in</div>
    } else {
      return (
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
      );
    }
  }
}


// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const component = connect(mapStateToProps)(Account);

export default component;
