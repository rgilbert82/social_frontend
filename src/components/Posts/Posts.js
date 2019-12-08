import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../services/redux/actions';
import { getPostsAPI } from '../../services/api/posts';
import { AddPost, Post } from '.';
import { Loading } from '../Misc';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postsLoaded: false
    };

    this.addPost    = this.addPost.bind(this);
    this.removePost = this.removePost.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchPosts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.fetchPosts();
    }
  }

  fetchPosts() {
    return getPostsAPI(this.props.user.id)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ posts: data.posts, postsLoaded: true });
        }
      }).catch(() => {
        this.props.setMessage({ content: `There was an error retrieving ${ this.props.user.name }'s posts.`, type: 'error' });
      });
  }

  addPost(post) {
    const newPosts = [post].concat(this.state.posts);
    this.setState({ posts: newPosts });
  }

  removePost(post_id) {
    const posts = this.state.posts.filter((post) => {
      return post.id !== post_id;
    });

    this.setState({ posts: posts });
  }

  render() {
    const currentUserPage = this.props.loggedIn && this.props.userStatus.isCurrentUser;
    let postForm;
    let content;

    if (currentUserPage) {
      postForm = <AddPost addPost={ this.addPost } />
    }

    if (this.state.postsLoaded) {
      content = this.state.posts.map((post) => {
        return (
          <li key={ post.body }>
            <Post
              post={ post }
              removePost={ this.removePost }
              userOwnsPost={ currentUserPage }
            />
          </li>
        );
      });
    } else {
      content = <Loading />;
    }

    return (
      <div>
        <h2>Posts</h2>

        { postForm }

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

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default component;
