import React from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{ this.props.title }</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser, title: state.title };
}

const component = connect(mapStateToProps)(Header);

export default component;
