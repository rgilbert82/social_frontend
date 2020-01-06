import React from 'react';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.currentUser.id,
      email: this.props.currentUser.email || '',
      first_name: this.props.currentUser.first_name || '',
      last_name: this.props.currentUser.last_name || '',
      birthday: this.props.currentUser.birthday ? this.props.currentUser.birthday.split('T')[0] : '',
      location: this.props.currentUser.location || '',
      tagline: this.props.currentUser.tagline || '',
      description: this.props.currentUser.description || ''
    };

    this.validForm   = this.validForm.bind(this);
    this.submitForm  = this.submitForm.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateBirthday = this.updateBirthday.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateTagline = this.updateTagline.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  validForm() {
    return this.state.email.length > 0 && this.state.first_name.length > 0;
  }

  submitForm() {
    this.props.submitForm(this.state);
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

  updateBirthday(e) {
    this.setState({ birthday: e.target.value });
  }

  updateLocation(e) {
    this.setState({ location: e.target.value });
  }

  updateTagline(e) {
    this.setState({ tagline: e.target.value });
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  render() {
    return (
      <div>
        <div className='b-form-group'>
          <label>Email</label>
          <input
            className='b-form--input'
            type='text'
            onChange={ this.updateEmail }
            value={ this.state.email }
          />
        </div>

        <div className='b-form-group'>
          <label>First Name</label>
          <input
            className='b-form--input'
            type='text'
            onChange={ this.updateFirstName }
            value={ this.state.first_name }
          />
        </div>

        <div className='b-form-group'>
          <label>Last Name</label>
          <input
            className='b-form--input'
            type='text'
            onChange={ this.updateLastName }
            value={ this.state.last_name }
          />
        </div>

        <div className='b-form-group'>
          <label>Birthday</label>
          <input
            className='b-form--input'
            type='date'
            onChange={ this.updateBirthday }
            value={ this.state.birthday }
          />
        </div>

        <div className='b-form-group'>
          <label>Location</label>
          <input
            className='b-form--input'
            type='text'
            onChange={ this.updateLocation }
            value={ this.state.location }
          />
        </div>

        <div className='b-form-group'>
          <label>Tagline</label>
          <input
            className='b-form--input'
            type='text'
            onChange={ this.updateTagline }
            value={ this.state.tagline }
          />
        </div>

        <div className='b-form-group'>
          <label>Description</label>
          <textarea
            className='b-form--input'
            onChange={ this.updateDescription }
            value={ this.state.description }
            maxLength='300'>
          </textarea>
        </div>

        <button
          className='b-form--btn b-btn'
          disabled={ !this.validForm() }
          onClick={ this.submitForm }
        >
          Update
          </button>
      </div>
    );
  }
}
