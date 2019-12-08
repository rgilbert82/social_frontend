import React from 'react';
import { connect } from 'react-redux';
import { Comments } from '../Comments';
import { UpdatePost } from '.';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.post
    };

    this.resetPost = this.resetPost.bind(this);
  }

  resetPost(post) {
    this.setState({ post: post });
  }

  render() {
    let updatePost;

    if (this.props.userOwnsPost ) {
      updatePost = <UpdatePost post={ this.state.post } removePost={ this.props.removePost } resetPost={ this.resetPost } />;
    }

    return (
      <div>
        <p>{ this.state.post.body }</p>
        <span>Likes: { this.state.post.likes.length }</span>
        { updatePost }
        <Comments post={ this.state.post } />
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
