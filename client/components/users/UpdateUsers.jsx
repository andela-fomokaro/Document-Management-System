/* eslint-disable no-undef*/
import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';

/**
 *
 * React component for
 * @class UpdateUsers
 * @extends {React.Component}
 */
class UpdateUsers extends React.Component {

  /**
   * Creates an instance of UpdateUsers.
   * React component for
   * @param {object} props - props of the component
   *
   * @memberOf UpdateUsers
   */
  constructor(props) {
    super(props);
    this.state = {
      users: {
        role: props.users.roleId,
        username: props.users.username,
        fullNames: props.users.fullNames,
        email: props.users.email,
        id: props.users.id
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * onSubmit
   * @param {object} e - event handler for onSubmit
   * @returns {void}
   * @memberOf UpdateUsers
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.updateUsers(this.state.users);
  }

  /**
   *
   * onChange
   * @param {object} e - event handler for onSubmit
   * @returns {void}
   * @memberOf UpdateUsers
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   * updateUserState
   * @param {object} event - event handler for onSubmi
   * @returns {object} - updated state of users
   *
   * @memberOf UpdateUsers
   */
  updateUserState(event) {
    const field = event.target.name;
    const userField = this.state.users;
    userField[field] = event.target.value;
    return this.setState({ userField });
  }
  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf UpdateUsers
   */
  render() {
    const { fullNames, username, role, email } = this.state.users;
    return (
      <Modal
        id="mod4"
        header='Update User Role'
        fixedFooter
        trigger={
          <a id="updateUser"className="updateBtn">Update user</a>
  }
      >
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="input-field col s12">
            <input
              type="text"
              className="validate"
              name="role"
              value={role}
              onChange={e => this.updateUserState(e)}
              placeholder="Roles Id"
            />
          </div>
          <div className="input-field col s12">
            <input
              type="text"
              className="validate"
              name="username"
              value={username}
              onChange={e => this.updateUserState(e)}
              placeholder="username"
            />
          </div>
          <div className="input-field col s12">
            <input
              type="text"
              className="validate"
              name="email"
              value={email}
              onChange={e => this.updateUserState(e)}
              placeholder="Email"
            />
          </div>
          <div className="input-field col s12">
            <input
              type="text"
              className="validate"
              name="fullNames"
              value={fullNames}
              onChange={e => this.updateUserState(e)}
              placeholder="Full Name"
            />
          </div>
          <button id="adminUpdate"className=" btn btn2 pink darken-4">Update</button>
           <button
            className="btn btn2 pink darken-4 white-text modal-action modal-close"
           >Close</button>
        </form>

      </Modal>
    );
  }
}

UpdateUsers.propTypes = {
  updateUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

export default UpdateUsers;
