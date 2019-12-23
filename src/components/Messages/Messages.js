import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Conversation, MessagesInbox, MessagesTrash } from '.';

class Messages extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return <div>Please log in</div>
    } else {
      return (
        <div>
          <h1>Messages</h1>

          <div>
            <Switch>
              <Route
                exact path='/messages'
                key='inbox'
                render={() => <MessagesInbox /> }
              />

              <Route
                exact path='/messages/trash'
                key='messagesTrash'
                render={() => <MessagesTrash /> }
              />

              <Route
                exact path='/messages/:slug'
                key='conversation'
                render={(props) => <Conversation { ...props } /> }
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
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  };
};

const component = connect(mapStateToProps)(Messages);

export default component;
