import React from 'react';
import { connect } from 'react-redux';
import { PostForm } from '../Forms';
import { setMessage } from '../../services/redux/actions';
import { createPostAPI } from '../../services/api/posts';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(post) {
    const postObj = {
      post: {
        body: post,
        user_id: this.props.currentUser.id
      }
    };

    return createPostAPI(postObj)
      .then((data) => {
        this.props.resetPosts();
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return <PostForm submitForm={ this.submitForm } />;
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

const component = connect(mapStateToProps, mapDispatchToProps)(AddPost);

export default component;
