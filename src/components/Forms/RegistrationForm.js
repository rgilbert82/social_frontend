import React from 'react';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    };

    this.validForm       = this.validForm.bind(this);
    this.submitForm      = this.submitForm.bind(this);
    this.updateEmail     = this.updateEmail.bind(this);
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName  = this.updateLastName.bind(this);
    this.updatePassword  = this.updatePassword.bind(this);
  }

  validForm() {
    return this.state.email.length > 0 && this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.password.length > 0;
  }

  submitForm() {
    this.props.submitForm({ user: this.state });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updateFirstName(e) {
    this.setState({ first_name: e.target.value });
  }

  updateLastName(e) {
    this.setState({ last_name: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className='s-registration-form'>
        <div className='b-form-group'>
          <input
            type='text'
            className='b-form--input'
            onChange={ this.updateFirstName }
            value={ this.state.first_name }
            placeholder='First Name' />

          <input
            type='text'
            className='b-form--input'
            onChange={ this.updateLastName }
            value={ this.state.last_name }
            placeholder='Last Name' />
        </div>

        <div className='b-form-group'>
          <input
            type='email'
            className='b-form--input'
            onChange={ this.updateEmail }
            value={ this.state.email }
            placeholder='Email' />

          <input
            type='password'
            className='b-form--input'
            onChange={ this.updatePassword }
            value={ this.state.password }
            placeholder='Password' />
        </div>

        <div className='b-form--btn-group'>
          <button
            className='b-form--btn b-btn'
            disabled={ !this.validForm() }
            onClick={ this.submitForm }>
            Sign Up
          </button>

          <CoinbaseCommerceButton className='b-btn b-btn--coinbase' checkoutId={ process.env.REACT_APP_COINBASE_CHECKOUT }>
            Donate with Crypto
          </CoinbaseCommerceButton>
        </div>
      </div>
    );
  }
}
