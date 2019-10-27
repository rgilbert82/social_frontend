import React from 'react';

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
      <div>
        <input type="email" onChange={ this.updateEmail } value={ this.state.email } placeholder="Email" />
        <input type="text" onChange={ this.updateFirstName } value={ this.state.first_name } placeholder="First Name" />
        <input type="text" onChange={ this.updateLastName } value={ this.state.last_name } placeholder="Last Name" />
        <input type="password" onChange={ this.updatePassword } value={ this.state.password } placeholder="Password" />
        <button disabled={ !this.validForm() } onClick={ this.submitForm }>Sign Up</button>
      </div>
    );
  }
}
