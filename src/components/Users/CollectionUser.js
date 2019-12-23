import React from 'react';
import { Link } from 'react-router-dom';
import { UserAvatarGrid } from '.';
import { defaultAvatar } from '../../services/misc';

export default class CollectionUser extends React.Component {
  render() {
    const avatar = this.props.user.avatar ? this.props.user.avatar.split(',') : defaultAvatar();
    const path   = `/users/${ this.props.user.slug }`;

    return (
      <div className='s-user--avatar-wrapper'>
        <Link to={ path }>{ this.props.user.name }</Link>

        <Link to={ path }>
          <UserAvatarGrid avatar={ avatar } />
        </Link>
      </div>
    );
  }
}
