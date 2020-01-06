import React from 'react';
import { connect } from 'react-redux';
import { Comments } from '../Comments';
import { Likes } from '../Likes';
import { UpdatePost } from '.';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      post: this.props.post
    };

    this.toggleEditForm  = this.toggleEditForm.bind(this);
    this.resetPost     = this.resetPost.bind(this);
  }

  toggleEditForm() {
    this.setState({ editable: !this.state.editable });
  }

  resetPost(post) {
    this.setState({ post: post, editable: false });
  }

  render() {
    const updateButtonText = this.state.editable ? 'Cancel' : 'Edit';
    let updateButton;
    let postContent;

    if (this.props.userOwnsPost) {
      updateButton = <button className='b-btn s-post--edit' onClick={ this.toggleEditForm }>{ updateButtonText }</button>
    }

    if (this.props.userOwnsPost && this.state.editable) {
      postContent = <UpdatePost post={ this.state.post } removePost={ this.props.removePost } resetPost={ this.resetPost } />;
    } else {
      postContent =
        <div className='s-post--content'>
          <p className='s-post--body'>{ this.state.post.body }</p>
          <span className='s-post--created-at'>{ new Date(this.state.post.created_at).toUTCString() }</span>
        </div>;
    }

    return (
      <div className='s-post'>

        { postContent }

        <div className='s-post--bottom-buttons'>
          <Likes likes={ this.state.post.likes } postId={ this.state.post.id } />
          { updateButton }
        </div>

        <div className='s-post--comments'>
          <Comments post={ this.state.post } />
        </div>
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
