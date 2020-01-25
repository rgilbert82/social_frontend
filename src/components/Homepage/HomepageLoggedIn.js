import React     from 'react';
import { Users } from '../Users';


export default class HomepageLoggedIn extends React.Component {
  render() {
    return (
      <div className='s-homepage'>
        <Users />
      </div>
    );
  }
}
