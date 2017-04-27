import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      roleId: '',
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
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <h5>Please Sign Up!</h5>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.username}
                onChange={this.onChange}
                name="username"
                id="name" type="text"
                className="active validate"
                required
              />
              <label htmlFor="name">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.fullNames}
                onChange={this.onChange}
                name="fullNames"
                id="fullNames" type="text"
                className="active validate"
                required
              />
              <label htmlFor="fullNames">Full Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.roleId}
                onChange={this.onChange}
                name="roleId"
                id="roleId" type="text"
                className="active validate"
                required
              />
              <label htmlFor="role">Role</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                name="password"
                id="password"
                type="password"
                className="validate"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="password">Password Confirmation</label>
              <input
                onChange={this.onChange}
                value={this.state.passwordConfirmation}
                name="passwordConfirmation"
                type="password"
                className="validate"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                id="email"
                type="email"
                className="validate"
              />
              <label htmlFor="email">Email</label>
              <button className="btn  blue darken-4">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default SignupForm;
