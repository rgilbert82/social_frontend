import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../services/redux/actions';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.closeMessageWindow = this.closeMessageWindow.bind(this);
  }

  componentDidMount() {
    const div = document.getElementById('b-notification--wrapper');

    div.classList.remove('b-notification--hidden');
    this._isMounted = true;


    setTimeout(() => {
      this.closeMessageWindow();
    }, 2500);
  }

  closeMessageWindow() {
    const div = document.getElementById('b-notification--wrapper');

    if (this._isMounted) {
      this._isMounted = false;
      div.classList.add('b-notification--hidden');

      setTimeout(() => {
        this.props.setMessage({ content: false, type: 'error' });
      }, 1000);
    }
  }

  render() {
    const className = `b-notification b-notification--${ this.props.message.type } b-notification--hidden`;

    return (
      <div id='b-notification--wrapper' className='b-notification--wrapper'>
        <div className='b-dark-overlay' onClick={ this.closeMessageWindow }></div>

        <div id='b-notification' className={ className } onClick={ this.closeMessageWindow }>
          <p>
            { this.props.message.content }
          </p>
        </div>
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

const component = connect(mapStateToProps, mapDispatchToProps)(Notification);

export default component;
