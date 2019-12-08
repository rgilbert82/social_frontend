import React from 'react';
import { connect } from 'react-redux';
import { PostForm } from '../Forms';
import { setMessage } from '../../services/redux/actions';
import { editCommentAPI, deleteCommentAPI } from '../../services/api/comments';

class UpdateComment extends React.Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  deleteComment() {
    return deleteCommentAPI(this.props.comment.id)
      .then(() => {
        this.props.removeComment(this.props.comment.id);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  submitForm(comment) {
    const commentObj = {
      comment: {
        body: comment,
        id: this.props.comment.id
      }
    };

    return editCommentAPI(commentObj)
      .then((data) => {
        this.props.resetComment(data.comment);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return (
      <div>
        <PostForm submitForm={ this.submitForm } body={ this.props.comment.body }/>
        <button onClick={ this.deleteComment }>Delete</button>
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

const component = connect(mapStateToProps, mapDispatchToProps)(UpdateComment);

export default component;
