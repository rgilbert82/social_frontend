import React from 'react';

export default class ConversationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      title: ''
    };

    this.validForm   = this.validForm.bind(this);
    this.submitForm  = this.submitForm.bind(this);
    this.updateBody  = this.updateBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  validForm() {
    return this.state.body.length > 0 && this.state.title.length > 0;
  }

  submitForm() {
    this.props.submitForm(this.state);
    this.setState({ body: '', title: '' });
  }

  updateTitle(e) {
    this.setState({ title: e.target.value });
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  render() {
    return (
      <div>
        <div className='b-form-group'>
          <input
            className='b-form--input'
            type='text'
            onChange={ this.updateTitle }
            value={ this.state.title }
            placeholder='Subject'
          />
        </div>

        <div className='b-form-group'>
          <textarea
            className='b-form--input'
            onChange={ this.updateBody }
            value={ this.state.body }
            placeholder='Message'>
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
