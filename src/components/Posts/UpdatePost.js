import React from 'react';
import { connect } from 'react-redux';
import { PostForm } from '../Forms';
import { setMessage } from '../../services/redux/actions';
import { editPostAPI, deletePostAPI } from '../../services/api/posts';

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  deletePost() {
    return deletePostAPI(this.props.post.id)
      .then(() => {
        this.props.removePost(this.props.post.id);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  submitForm(post) {
    const postObj = {
      post: {
        body: post,
        id: this.props.post.id
      }
    };

    return editPostAPI(postObj)
      .then((data) => {
        this.props.resetPost(data.post);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return (
      <div>
        <PostForm submitForm={ this.submitForm } body={ this.props.post.body }/>
        <button onClick={ this.deletePost }>Delete</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(UpdatePost);

export default component;
