import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../../actions/roleActions';

class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: []
    };
    this.getRoles = this.getRoles.bind(this)
  }

  componentDidMount() {
    this.setState({ h: this.getRoles(this.props.user.id) });
  }
  onUpdate(roleId, userId) {
    console.log(roleId, userId);
    return () => {};
  }

  getRoles(userId) {
    return this.props.roles.map(role =>
      <li key={role.id} value={userId} onClick={() => this.onUpdate(role.id, userId)}>{role.title}</li>);
  }

  render() {
    const { user } = this.props;
    console.log(user.id);

    return (
      <tr>
        <td>{user.roleId}</td>
        <td>{user.updatedAt}</td>
        <td>{user.email}</td>
        <td>{user.fullNames}</td>
        <td>{user.username}</td>
        <td className="cursor"><a onClick={() => this.deleteUser(user.id)}>Delete</a></td>
        <td>
          {/* <UpdateUsers updateUser={this.props.updateUser} users={user} />*/}
          <a className="cursor dropdown-button" data-activates="dropdown1">Update role!</a>
          <ul id="dropdown1" className="dropdown-content">
            {this.state.h}
          </ul>
        </td>
        <td>{user.id}</td>
      </tr>
    );
  }
}

export default SingleUser;

