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
          console.log('POSTS');
          console.log(data);
        }
      }).catch(() => {
        this.props.setMessage({ content: `There was an error retrieving ${ this.props.user.name }'s posts.`, type: 'error' });
      });
  }

  render() {
    let postForm;
    let content;

    if (this.props.loggedIn) {
      postForm = <AddPost resetPosts={ this.fetchPosts } />
    }

    if (this.state.postsLoaded) {
      content = this.state.posts.map((post) => {
        return (
          <li key={ post.id }>
            <Post post={ post } resetPosts={ this.fetchPosts } />
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
