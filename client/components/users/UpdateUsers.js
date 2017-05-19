import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';

class UpdateUsers extends React.Component {
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

  onSubmit(e) {
    e.preventDefault();
    this.props.updateUser(this.state);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateUserState(event) {
    const field = event.target.name;
    const userField = this.state.users;
    userField[field] = field === 'typeId' ? Number(event.target.value) : event.target.value;
    return this.setState({ userField });
  }

  updateUser() {
    this.props.updateUser(this.state.users);
  }

  render() {
    console.log(this.props, 'user`id');
    const { fullNames, username, role, email } = this.state.users;
    return (
      <Modal
        fixedFooter
        trigger={
          <a className="updateBtn">Click to update user</a>
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
          <button className=" btn pink darken-4" onClick={() => this.updateUser()}>Update</button>
        </form>

      </Modal>
    );
  }
}

UpdateUsers.propTypes = {
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.any.isRequired,
};

export default UpdateUsers;
