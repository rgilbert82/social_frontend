import React from 'react';
import { Loading } from '../Misc';
import { UsersMain } from '.';
import { getUsersAPI } from '../../services/api/users';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchUsers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchUsers() {
    return getUsersAPI()
      .then((data) => {
        if (this._isMounted) {
          this.setState({ users: data });
        }
      }).catch();
  }

  render() {
    if (this.state.users.length) {
      return (
        <div className='s-users--page'>
          <h1 className='s-users--header'>Popular Users</h1>
          <UsersMain users={ this.state.users } />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
