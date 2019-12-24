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
    this.fetchUsers();
  }

  fetchUsers() {
    return getUsersAPI()
      .then((data) => {
        this.setState({ users: data });
      }).catch();
  }

  render() {
    if (this.state.users.length) {
      return (
        <div>
          <h1>users</h1>
          <UsersMain users={ this.state.users } />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
