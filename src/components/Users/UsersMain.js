import React from 'react';
import { Link } from 'react-router-dom';

export default class UsersMain extends React.Component {
  render() {
    const content = this.props.users.map((user) => {
      let path = `/users/${ user.slug }`;

      return (
        <li key={ user.id }>
          <Link to={ path }>{ user.first_name } { user.last_name }</Link>
        </li>
      );
    });

    return (
      <div>
        <h1>Popular Users</h1>

        <ul>
          { content }
        </ul>
      </div>
    );
  }
}