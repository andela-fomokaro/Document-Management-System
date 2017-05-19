import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, createUsers, deleteUser, updateUser, getRoles } from '../../actions/usersAction';
import CreateUsers from './CreateUsers';
import UpdateUsers from './UpdateUsers';


class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getRoles();
  }


  deleteUser(userId) {
    this.props.deleteUser(userId);
  }

  updateUser() {
    this.props.updateUser();
  }

  render() {
    const { users } = this.props;
    return (
      <div className="container">
        <table className="z-depth-5 tabs">
          <thead>
            <tr>
              <th>Role Id</th>
              <th>Last Updated</th>
              <th>Email</th>
              <th>Name</th>
              <th>Username</th>
              <th>Delete</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index, roles) => (
              <tr key={index}>
                <td>{user.roleId}</td>
                <td>{user.updatedAt}</td>
                <td>{user.email}</td>
                <td>{user.fullNames}</td>
                <td>{user.username}</td>
                <td className="cursor"><a onClick={() => this.deleteUser(user.id)}>Delete</a></td>
                <td>
                  <UpdateUsers updateUser={this.props.updateUser} users={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateUsers createUsers={this.props.createUsers} users={this.props.users} />
      </div>
    );
  }
}

ManageUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  createUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
    roles: state.roles
  };
}

export default connect(mapStateToProps,
{ getUsers, createUsers, deleteUser, updateUser, getRoles })(ManageUsers);
