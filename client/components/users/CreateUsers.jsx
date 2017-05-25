/* eslint-disable no-undef*/
/* eslint-disable no-unused-vars*/
import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import validateInput from '../../../shared/validate/signUp';

/**
 *
 * React component for
 * @class CreateUsers
 * @extends {React.Component}
 */
class CreateUsers extends React.Component {

  /**
   * Creates an instance of CreateUsers.
   * Constructor
   * @param {any} props - props of the component
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
   * onSubmit
   * @param {any} e
   * @returns {void}
   * @memberOf CreateUsers
   */
  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (errors.passwordConfirmation || errors.email) {
      Materialize.toast('Wrong password or email entered', 2000);
    } else if (errors) {
      Materialize.toast('Username and email must be unique', 2000);
    } else {
      this.props.createUsers(this.state);
      Materialize.toast('User Created Successfully', 2000);
    }
  }


  /**
   *
   * onChange
   * @param {any} e - event handler belonging to onChange
   * @returns {void}
   * @memberOf CreateUsers
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf CreateUsers
   */
  render() {
    return (
      <Modal
        fixedFooter
        trigger={
          <a
            className=
            "btn pink darken-4 white-textright pink darken-3 right up btnUp tooltipped"
            data-position="left" data-delay="10" data-tooltip="Click to create new user"
            id="adminCreateModal"
          >Create User</a>
  }
      >

        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            label="Username"
            onChange={this.onChange}
            type="text"
            name="username"
            checkUserExists={this.checkUserExists}
            value={this.state.username}
            field="username"
            required
          />

          <TextFieldGroup
            label="Full Names"
            onChange={this.onChange}
            type="text"
            name="fullNames"
            checkUserExists={this.checkUserExists}
            value={this.state.value}
            field="fullNames"
            required
          />

          <TextFieldGroup
            label="Email"
            onChange={this.onChange}
            type="email"
            name="email"
            checkUserExists={this.checkUserExists}
            value={this.state.email}
            field="email"
            required
          />

          <div className="row">
            <input
              onChange={this.onChange}
              value={this.state.password}
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
              value={this.state.passwordConfirmation}
              name="passwordConfirmation"
              type="password"
              className="validate"
              placeholder="Password Confirmation"
              required
            />
          </div>
          <button
          id="adminCreateUser"className="btn  pink darken-4">Send</button>
        </form>
      </Modal>
    );
  }
}

CreateUsers.propTypes = {
  createUsers: propTypes.func.isRequired
};
export default CreateUsers;
