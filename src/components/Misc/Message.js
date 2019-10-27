import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../services/redux/actions';
import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.closeMessageWindow = this.closeMessageWindow.bind(this);
  }

  closeMessageWindow() {
    this.props.setMessage({ content: false, type: 'error' });
  }

  render() {
    return (
      <div className='b-message b-message-{ this.props.message.type }' onClick={ this.closeMessageWindow }>
        <p>
          { this.props.message.content }
        </p>
      </div>
    );
  }
}

// REDUX ======================================================================

const mapStateToProps = (state) => {
  return {
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (payload) => dispatch(setMessage(payload))
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(Message);

export default component;
