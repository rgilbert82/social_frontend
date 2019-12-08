import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateComment } from '.';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: this.props.comment
    };

    this.resetComment = this.resetComment.bind(this);
  }

  resetComment(comment) {
    this.setState({ comment: comment });
  }

  render() {
    const userOwnsComment = this.props.loggedIn && this.props.currentUser.id === this.state.comment.user.id;
    const path = `/users/${ this.state.comment.user.slug }`;
    let updateComment;

    if (userOwnsComment) {
      updateComment = <UpdateComment comment={ this.state.comment } resetComment={ this.resetComment } removeComment={ this.props.removeComment }/>;
    }

    return (
      <div>
        <div>
          <p>{ this.state.comment.body }</p>
          { updateComment }

          <span>
            By: <Link to={ path }>{ this.state.comment.user.name }</Link>
          </span>
        </div>

        <span>Likes: { this.state.comment.likes.length }</span>
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
