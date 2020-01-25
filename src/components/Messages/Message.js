import React    from 'react';
import { Link } from 'react-router-dom';


export default class Message extends React.Component {
  render() {
    const userPath = `/users/${ this.props.message.sender.slug }`;

    return (
      <div className='s-message--conversation-message'>
        <p className='s-message--conversation-message--body'>{ this.props.message.body }</p>

        <div className='s-message--conversation-message--details'>
          <span>From: <Link to={ userPath }>{ this.props.message.sender.name }</Link></span>
          <span className='b-divider'> - </span>
          <span>{ this.props.message.created_at }</span>
        </div>
      </div>
    );
  }
}
