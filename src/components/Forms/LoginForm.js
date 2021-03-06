import React from 'react';


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.validForm      = this.validForm.bind(this);
    this.submitForm     = this.submitForm.bind(this);
    this.updateEmail    = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  validForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  submitForm() {
    this.props.submitForm({ user: this.state });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className='s-login-form'>
        <input
          type='email'
          className='b-form--input'
          onChange={ this.updateEmail }
          value={ this.state.email }
          placeholder='email' />

        <input
          type='password'
          className='b-form--input'
          onChange={ this.updatePassword }
          value={ this.state.password }
          placeholder='password' />

        <button
          className='b-form--btn b-btn'
          disabled={ !this.validForm() }
          onClick={ this.submitForm }>
          Login
        </button>
      </div>
    );
  }
}
