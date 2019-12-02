import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Comment extends React.Component {
  render() {
    const path = `/users/${ this.props.comment.user.slug }`;
    return (
      <div>
        <div>
          <p>{ this.props.comment.body }</p>
          <span>
            By: <Link to={ path }>{ this.props.comment.user.name }</Link>
          </span>
        </div>

        <span>Likes: { this.props.comment.likes.length }</span>
      </div>
    );
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    message: state.message
  };
};

const component = connect(mapStateToProps)(Comment);

export default component;
