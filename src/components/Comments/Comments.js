import React from 'react';
import { connect } from 'react-redux';
import { Comment } from '.';

class Comments extends React.Component {
  render() {
    const content = this.props.post.comments.map((comment) => {
      return (
        <li key={ comment.id }>
          <Comment postId={this.props.post.id} comment={ comment } />
        </li>
      );
    });

    return (
      <div>
        <p>Comments</p>

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
