import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      fullNames: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createUsers(this.state);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { username, email, password, passwordConfirmation, fullNames } = this.state;
    return (
      <Modal
        fixedFooter
        trigger={
          <a className="pulse btn-floating btn-large waves-effect waves-white pink darken-3 right up btnUp">
            <i className="material-icons">C</i></a>
  }
      >

        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            label="Username"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={username}
            field="username"
            required
          />

          <TextFieldGroup
            label="Full Names"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={fullNames}
            field="fullNames"
            required
          />

          <TextFieldGroup
            label="Email"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={email}
            field="email"
            required
          />

          <div className="row">
            <input
              onChange={this.onChange}
              value={password}
              name="password"
              type="password"
              placeholder="Password"
              className="validate"
              required
            />
          </div>

          <div className="row">
            <input
              onChange={this.onChange}
              value={passwordConfirmation}
              name="passwordConfirmation"
              type="password"
              className="validate"
              placeholder="Password Confirmation"
              required
            />
          </div>
          <button className="btn  pink darken-4">Send</button>
        </form>
      </Modal>
    );
  }
}

CreateUsers.propTypes = {
  createUsers: propTypes.func.isRequired
};
export default CreateUsers;
