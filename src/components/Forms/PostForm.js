import React from 'react';


export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body || ''
    };

    this.validForm   = this.validForm.bind(this);
    this.submitForm  = this.submitForm.bind(this);
    this.updateBody  = this.updateBody.bind(this);
  }

  validForm() {
    return this.state.body.length > 0;
  }

  submitForm() {
    this.props.submitForm(this.state.body);
    this.setState({ body: '' });
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  render() {
    let buttonText;
    let deleteButton;

    if (this.props.body) {
      buttonText = 'Edit';
    } else if (this.props.comment) {
      buttonText = 'Comment';
    } else {
      buttonText = 'Post';
    }

    if (this.props.deleteButton) {
      deleteButton =
        <button
          className='b-btn'
          onClick={ this.props.deletePost }>
            Delete
        </button>;
    }

    return (
      <div className='s-post-form'>
        <div className='b-form-group'>
          <textarea
            className='b-form--input'
            onChange={ this.updateBody }
            value={ this.state.body }
            placeholder={ `New ${ buttonText }` }>
          </textarea>
        </div>

        <button
          className='b-form--btn b-btn'
          disabled={ !this.validForm() }
          onClick={ this.submitForm }>
            { buttonText }
        </button>

        { deleteButton }
      </div>
    );
  }
}
