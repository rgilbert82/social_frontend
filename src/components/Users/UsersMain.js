import React from 'react';
import { CollectionUser } from '.';

export default class UsersMain extends React.Component {
  render() {
    const content = this.props.users.map((user) => {
      return (
        <li key={ user.id }>
          <CollectionUser user={ user }/>
        </li>
      );
    });

    return (
      <div className='s-users'>
        <ul>
          { content }
        </ul>
      </div>
    );
  }
}
