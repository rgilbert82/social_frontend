import React from 'react';
import { Link } from 'react-router-dom';

export default class UsersMain extends React.Component {
  render() {
    const content = this.props.users.map((user) => {
      let path = `/users/${ user.slug }`;

      return (
        <li key={ user.id }>
          <Link to={ path }>{ user.name }</Link>
        </li>
      );
    });

    return (
      <div>
        <h1>users</h1>

        <ul>
          { content }
        </ul>
      </div>
    );
  }
}
