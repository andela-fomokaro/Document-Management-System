import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../shared/validate/signUp';

/**
 * 
 * 
 * @class CreateUsers
 * @extends {React.Component}
 */
class CreateUsers extends React.Component {

  /**
   * Creates an instance of CreateUsers.
   * @param {any} props 
   * 
   * @memberOf CreateUsers
   */
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

  /**
   * 
   * 
   * @param {any} e 
   * 
   * @memberOf CreateUsers
   */
  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
     Materialize.toast('Wrong password or email entered', 2000);
    } else {
      this.props.createUsers(this.state);
      Materialize.toast('User Created Successfully', 2000);
    }
  }

    
  /**
   * 
   * 
   * @param {any} e 
   * 
   * @memberOf CreateUsers
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf CreateUsers
   */
  render() {
    const { username, email, password, passwordConfirmation, fullNames } = this.state;
    return (
      <Modal
        fixedFooter
        trigger={
          <a className="btn pink darken-4 white-text right pink darken-3 right up btnUp">Create User</a>
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
