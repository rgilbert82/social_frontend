import React from 'react';
import { UserMain } from '.';
import { Loading, NothingHere } from '../Misc';
import { getUserAPI } from '../../services/api/users';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userNotFound: false
    };

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchUser();
    }
  }

  fetchUser() {
    return getUserAPI(this.props.match.params.slug)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ user: data });
        }
      }).catch(() => {
        if (this._isMounted) {
          this.setState({ userNotFound: true });
        }
      });
  }

  render() {
    if (this.state.user.id) {
      return <UserMain user={ this.state.user } />
    } else if (this.state.userNotFound) {
      return <NothingHere />;
    } else {
      return <Loading />;
    }
  }
}
