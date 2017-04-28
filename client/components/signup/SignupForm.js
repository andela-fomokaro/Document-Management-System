import React from 'react';
import propTypes from 'prop-types';
// import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';

 
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      fullNames: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <h5>Please Sign Up!</h5>

          <TextFieldGroup
            label="Username"
            onChange={this.onChange}
            value={this.state.username}
            field="username"
            required
          />

          <TextFieldGroup
            label="Full Names"
            onChange={this.onChange}
            value={this.state.fullNames}
            field="fullnames"
            required
          />

          <TextFieldGroup
            label="Email"
            onChange={this.onChange}
            value={this.state.email}
            field="email"
            required
          />

          <TextFieldGroup
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            required
          />

          <TextFieldGroup
            label="Password Confirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            field="passwordConfirmation"
            required
          />
          <button className="btn  blue darken-4">Sign Up</button>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: propTypes.func.isRequired
};


export default SignupForm;
