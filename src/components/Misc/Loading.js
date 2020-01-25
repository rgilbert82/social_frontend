import React from 'react';


export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageEnd: '',
    };

    this.animateMessage = this.animateMessage.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.animateMessage();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  animateMessage() {
    if (this._isMounted) {
      if (this.state.messageEnd.length >= 50) {
        this.setState({ messageEnd: '•' });
      } else {
        this.setState({ messageEnd: this.state.messageEnd + '•' });
      }

      setTimeout(() => {
        this.animateMessage();
      }, 100);
    }
  }

  render() {
    return (
      <div className='b-single-message'>
        { this.state.messageEnd }<br/>
        Loading<br/>
        { this.state.messageEnd }
      </div>
    );
  }
}
