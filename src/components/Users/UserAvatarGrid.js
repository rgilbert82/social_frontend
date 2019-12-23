import React from 'react';
import { SketchPicker } from 'react-color';

export default class UserAvatarGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#49DC0F'
    };

    this.makeCells       = this.makeCells.bind(this);
    this.makeColorPicker = this.makeColorPicker.bind(this);
    this.colorSelect     = this.colorSelect.bind(this);
    this.updateColor     = this.updateColor.bind(this);
  }

  colorSelect(color) {
    this.setState({
      color: color.hex
    });
  }

  updateColor(e) {
    const values = {
      color: this.state.color,
      id: e.target.dataset.cellId
    };

    this.props.updateAvatar(values);
  }

  makeColorPicker() {
    return this.props.editable ?
      <SketchPicker
        color={ this.state.color }
        onChangeComplete={ this.colorSelect }
      /> : null;
  }

  makeCells() {
    return this.props.avatar.map((cell, idx) => {
      const style = {
        backgroundColor: cell
      };

      const innerCell = this.props.editable ?
        <div className='s-user--avatar-cell-inner s-user--avatar-cell-inner--editable'
             data-cell-id={ idx }
             onClick={ this.updateColor }
             style={ style }>
        </div> :
        <div className='s-user--avatar-cell-inner'
             style={ style }>
        </div>;

      return (
        <li key={ `gridCell${ idx }` } className='s-user--avatar-cell'>
          { innerCell }
        </li>
      );
    });
  }

  render() {
    const grid = this.makeCells();
    const colorPicker = this.makeColorPicker();

    return (
      <div>
        <ul className='s-user--avatar'>
          { grid }
        </ul>

        { colorPicker }
      </div>
    );
  }
}
