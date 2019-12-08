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

    if (this.props.body) {
      buttonText = 'Edit';
    } else if (this.props.comment) {
      buttonText = 'Comment';
    } else {
      buttonText = 'Post';
    }

    return (
      <div>
        <textarea onChange={ this.updateBody } value={ this.state.body } ></textarea>
        <button disabled={ !this.validForm() } onClick={ this.submitForm }>{ buttonText }</button>
      </div>
    );
  }
}
