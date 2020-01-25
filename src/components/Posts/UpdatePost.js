import React          from 'react';
import { PostForm }   from '../Forms';
import { connect }    from 'react-redux';
import { getToken }   from '../../services/sessions';
import { setMessage } from '../../services/redux/actions';
import { editPostAPI, deletePostAPI } from '../../services/api/posts';


class UpdatePost extends React.Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  deletePost() {
    const token = getToken();

    return deletePostAPI(this.props.post.id, token)
      .then(() => {
        this.props.removePost(this.props.post.id);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  submitForm(post) {
    const token = getToken();
    const postObj = {
      post: {
        body: post,
        id: this.props.post.id
      }
    };

    return editPostAPI(postObj, token)
      .then((data) => {
        this.props.resetPost(data.post);
      }).catch((err) => {
        this.props.setMessage({ content: err.errors, type: 'error' });
      });
  }

  render() {
    return (
      <div className='s-post--update'>
        <PostForm
          submitForm={ this.submitForm }
          body={ this.props.post.body }
          deleteButton={ true }
          deletePost={ this.deletePost }
        />
      </div>
    );
  }
}


// REDUX ======================================================================

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(null, mapDispatchToProps)(UpdatePost);

export default component;
