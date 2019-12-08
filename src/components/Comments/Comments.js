import React from 'react';
import { connect } from 'react-redux';
import { AddComment, Comment } from '.';


class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.post.comments
    };

    this.addComment = this.addComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  addComment(comment) {
    const newComments = [comment].concat(this.state.comments);

    this.setState({ comments: newComments });
  }

  removeComment(comment_id) {
    const comments = this.state.comments.filter((comment) => {
      return comment.id !== comment_id;
    });

    this.setState({ comments: comments });
  }

  render() {
    let addComment;

    if (this.props.loggedIn) {
      addComment = <AddComment post={ this.props.post } currentUser={ this.props.currentUser } addComment={ this.addComment } />;
    }

    const content = this.state.comments.map((comment) => {
      return (
        <li key={ comment.id }>
          <Comment postId={this.props.post.id} comment={ comment } removeComment={ this.removeComment }/>
        </li>
      );
    });

    return (
      <div>
        <p>Comments</p>

        { addComment }

        <ul>
          { content }
        </ul>
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

const component = connect(mapStateToProps)(Comments);

export default component;
