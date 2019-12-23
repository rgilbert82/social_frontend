import React from 'react';
import { Link } from 'react-router-dom';

export default class Message extends React.Component {
  render() {
    const userPath = `/users/${ this.props.message.sender.slug }`;

    return (
      <div>
        <p>{ this.props.message.body }</p>

        <div>
          From: <Link to={ userPath }>{ this.props.message.sender.name }</Link> - <small>{ this.props.message.created_at }</small>
        </div>
      </div>
    );
  }
}
