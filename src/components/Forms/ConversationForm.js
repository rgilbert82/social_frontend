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
        <input type='text' onChange={ this.updateTitle } value={ this.state.title }/>
        <textarea onChange={ this.updateBody } value={ this.state.body }></textarea>
        <button disabled={ !this.validForm() } onClick={ this.submitForm }>Send</button>
      </div>
    );
  }
}
