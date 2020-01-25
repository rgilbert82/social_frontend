import React             from 'react';
import { Link }          from 'react-router-dom';
import { Likes }         from '../Likes';
import { UpdateComment } from '.';
import { connect }       from 'react-redux';


class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      comment: this.props.comment
    };

    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.resetComment   = this.resetComment.bind(this);
  }

  toggleEditForm() {
    this.setState({ editable: !this.state.editable });
  }

  resetComment(comment) {
    this.setState({ comment: comment, editable: false });
  }

  render() {
    const userOwnsComment = this.props.loggedIn && this.props.currentUser.id === this.state.comment.user.id;
    const path = `/users/${ this.state.comment.user.slug }`;
    const updateButtonText = this.state.editable ? 'Cancel' : 'Edit';
    let updateButton;
    let commentContent;

    if (userOwnsComment) {
      updateButton = <button className='b-btn s-comment--edit' onClick={ this.toggleEditForm }>{ updateButtonText }</button>
    }

    if (userOwnsComment && this.state.editable) {
      commentContent = <UpdateComment comment={ this.state.comment } resetComment={ this.resetComment } removeComment={ this.props.removeComment }/>;
    } else {
      commentContent =
        <div className='s-comment--content'>
          <p className='s-comment--body'>{ this.state.comment.body }</p>

          <span className='s-comment--author'>
            By: <Link to={ path }>{ this.state.comment.user.name }</Link>
          </span>

          <span className='s-comment--created-at'>{ new Date(this.state.comment.created_at).toUTCString() }</span>
        </div>;
    }

    return (
      <div className='s-comment'>

        { commentContent }

        <div className='s-comment--bottom-buttons'>
          <Likes likes={ this.state.comment.likes } commentId={ this.state.comment.id } />
          { updateButton }
        </div>
      </div>
    );
  }
}


// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  };
};

const component = connect(mapStateToProps)(Comment);

export default component;
