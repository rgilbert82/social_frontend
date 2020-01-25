import React from 'react';


export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
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
    return (
      <div className='s-message-form'>
        <div className='b-form-group'>
          <textarea
            className='b-form--input'
            onChange={ this.updateBody }
            value={ this.state.body }
            placeholder='New Message'>
          </textarea>
        </div>

        <button
          className='b-form--btn b-btn'
          disabled={ !this.validForm() }
          onClick={ this.submitForm }>
          Send
        </button>
      </div>
    );
  }
}
