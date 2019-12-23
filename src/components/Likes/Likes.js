import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../services/sessions';
import { setMessage } from '../../services/redux/actions';
import { updateLikeStatusAPI } from '../../services/api/likes';


class Likes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: this.props.likes,
    };

    this.resetLike = this.resetLike.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateLikeStatus = this.updateLikeStatus.bind(this);
    this.updateSuperLikeStatus = this.updateSuperLikeStatus.bind(this);
    this.setUserStatus = this.setUserStatus.bind(this);
  }

  componentDidMount() {
    this.setUserStatus();
  }

  setUserStatus() {
    let likesCount      = 0;
    let superLikesCount = 0;
    let userLike;
    let userHasLiked;
    let userHasSuperLiked;

    if (this.props.loggedIn) {
      userLike = this.state.likes.filter((like) => {
        if (like.like) { likesCount += 1 }
        if (like.super_like) { superLikesCount += 1 }
        return like.user.id === this.props.currentUser.id;
      })[0];
    }

    userHasLiked      = userLike && userLike.like;
    userHasSuperLiked = userLike && userLike.super_like;

    this.setState({
      likesCount: likesCount,
      superLikesCount: superLikesCount,
      userLike: userLike,
      userHasLiked: userHasLiked,
      userHasSuperLiked: userHasSuperLiked
    });
  }

  resetLike(newLike) {
    console.log(newLike);
    let likeAdded = false;
    let newLikes = this.state.likes.map((like) => {
      if (like.user.id === newLike.user.id) {
        likeAdded = true;
        return newLike;
      } else {
        return like;
      }
    });

    if (!likeAdded) {
      newLikes.push(newLike);
    }

    this.setState({ likes: newLikes });
    this.setUserStatus();

    console.log(newLikes);
    console.log(this.state.likes);
  }

  updateStatus(data) {
    const token = getToken();

    return updateLikeStatusAPI(data, token)
      .then((data) => {
        this.resetLike(data.like);
      }).catch(() => {
        this.props.setMessage({
          content: 'Oops! Something went wrong.',
          type: 'error'
        });
      });
  }

  updateLikeStatus() {
    const data  = {
      like: {
        like: !this.state.userHasLiked,
        super_like: !!this.state.userHasSuperLiked,
        user_id: this.props.currentUser.id,
        post_id: this.props.postId,
        comment_id: this.props.commentId
      }
    };

    this.updateStatus(data);
  }

  updateSuperLikeStatus() {
    const data  = {
        like: {
        like: !!this.state.userHasLiked,
        super_like: !this.state.userHasSuperLiked,
        user_id: this.props.currentUser.id,
        post_id: this.props.postId,
        comment_id: this.props.commentId
      }
    };

    this.updateStatus(data);
  }

  render() {
    const likeButtonText      = this.state.userHasLiked ? 'Unlike' : 'Like';
    const superLikeButtonText = this.state.userHasSuperLiked ? 'Unlove' : 'Love';
    const likeButtons = !this.props.loggedIn ? null : (
      <div>
        <button onClick={ this.updateLikeStatus }>{ likeButtonText }</button>
        <button onClick={ this.updateSuperLikeStatus }>{ superLikeButtonText }</button>
      </div>
    );

    return (
      <div>
        <div>Likes: { this.state.likesCount }</div>
        <div>Loves: { this.state.superLikesCount }</div>
        { likeButtons }
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

const component = connect(mapStateToProps, mapDispatchToProps)(Likes);

export default component;
