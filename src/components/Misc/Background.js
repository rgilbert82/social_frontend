import React from 'react';

export default class Background extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeClass: 'b-background-hidden',
      content: null,
      hidden:  true
    };

    this.fadeIn  = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.animationCycle = this.animationCycle.bind(this);
    this.getRandomInteger = this.getRandomInteger.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.animationCycle();
    }, 1000);
  }

  fadeIn() {
    this.setState({ fadeClass: '', hidden: false });
  }

  fadeOut() {
    this.setState({ fadeClass: 'b-background-hidden', hidden: true });
  }

  getRandomInteger(n) {
    return Math.floor(Math.random() * n);
  }

  reMakeContent() {
    const emptyArray = [...Array(this.getRandomInteger(100))];
    const content    = emptyArray.map((el, idx) => {
      return <rect key={ idx }
        stroke={ `rgb(${this.getRandomInteger(255)}, ${this.getRandomInteger(255)}, ${this.getRandomInteger(255)})` }
        fill={ `rgb(${this.getRandomInteger(255)}, ${this.getRandomInteger(255)}, ${this.getRandomInteger(255)})` }
        strokeWidth='3'
        x={ this.getRandomInteger(850) }
        y={ this.getRandomInteger(750) }
        width={ this.getRandomInteger(700) }
        height={ this.getRandomInteger(600) }
        transform={ `rotate(${ this.getRandomInteger(180) })`} >
      </rect>
    });

    this.setState({ content: content });
  }

  animationCycle() {
    if (this.state.hidden) {
      setTimeout(() => {
        this.reMakeContent();
        this.fadeIn();
        this.animationCycle();
      }, 1000);
    } else {
      setTimeout(() => {
        this.fadeOut();
        this.animationCycle();
      }, 6000);
    }
  }

  render() {
    const fadeClass = `b-background ${ this.state.fadeClass }`;

    return (
      <div className={ fadeClass }>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 1000 2000'>
          { this.state.content }
        </svg>
      </div>
    );
  }
}
