import React from 'react';
import { connect } from 'react-redux';
import { AddComment, Comments } from '../Comments';

class Post extends React.Component {
  render() {
    let addComment;

    if (this.props.loggedIn) {
      addComment = <AddComment post={ this.props.post } currentUser={ this.props.currentUser } resetPosts={ this.props.resetPosts } />;
    }

    return (
      <div>
        <p>{ this.props.post.body }</p>
        <span>Likes: { this.props.post.likes.length }</span>
        { addComment }
        <Comments post={ this.props.post } />
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

const component = connect(mapStateToProps)(Post);

export default component;
