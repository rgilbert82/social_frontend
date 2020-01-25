import React             from 'react';
import { Loading }       from '../Misc';
import { AddPost, Post } from '.';
import { connect }       from 'react-redux';
import { setMessage }    from '../../services/redux/actions';
import { getPostsAPI }   from '../../services/api/posts';


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
    const currentUserPage = this.props.loggedIn && this.props.userStatus && this.props.userStatus.isCurrentUser;
    let postForm;
    let content;

    if (currentUserPage) {
      postForm =
        <div className='s-posts--add-post'>
          <AddPost addPost={ this.addPost } />
        </div>;
    }

    if (this.state.postsLoaded) {
      content = this.state.posts.map((post) => {
        return (
          <li key={ post.body } className='s-posts--post'>
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
      <div className='s-posts'>
        <h2 className='s-posts--title'>Posts ({ this.state.posts.length })</h2>

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
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (payload) => dispatch(setMessage(payload))
  }
};

const component = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default component;
