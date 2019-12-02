import React from 'react';
import { connect } from 'react-redux';
import { PostForm } from '../Forms';
import { setMessage } from '../../services/redux/actions';
import { createCommentAPI } from '../../services/api/comments';

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(comment) {
    const commentObj = {
      comment: {
        body: comment,
        post_id: this.props.post.id,
        user_id: this.props.currentUser.id
      }
    };

    return createCommentAPI(commentObj)
      .then((data) => {
        this.props.resetPosts();
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return <PostForm submitForm={ this.submitForm } comment={ true }/>;
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

const component = connect(mapStateToProps, mapDispatchToProps)(AddComment);

export default component;
