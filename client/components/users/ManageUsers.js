import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-materialize';
import { getUsers, createUsers, deleteUser, updateUsers, getRoles } from '../../actions/usersAction';
import CreateUsers from './CreateUsers';
import UpdateUsers from './UpdateUsers';


/**
 * 
 * 
 * @class ManageUsers
 * @extends {React.Component}
 */
class ManageUsers extends React.Component {

  /**
   * 
   * 
   * 
   * @memberOf ManageUsers
   */
  componentDidMount() {
    this.props.getUsers();
  }


  /**
   * 
   * 
   * @param {any} userId 
   * 
   * @memberOf ManageUsers
   */
  deleteUser(userId) {
    Materialize.toast('User Deleted', 3000);
    this.props.deleteUser(userId);
  }

  /**
   * 
   * 
   * 
   * @memberOf ManageUsers
   */
  updateUser() {
    this.props.updateUsers();
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf ManageUsers
   */
  render() {
    const { users } = this.props;
    const usersInfo = this.props.users;
    const createdAt = moment(usersInfo.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const updatedAt = moment(usersInfo.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <div className="manageUser">
        <table className="z-depth-5 striped tabs">
          <thead className="tableHead">
            <tr>
              <th>Role Id</th>
              <th>Time Created</th>
              <th>Last Updated</th>
              <th>Email</th>
              <th>Name</th>
              <th>Username</th>
              <th>Delete</th>
              <th>Update User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="styleRow">
                <td className="styleRow">{user.roleId}</td>
                <td>{createdAt}</td>
                <td>{updatedAt}</td>
                <td>{user.email}</td>
                <td>{user.fullNames}</td>
                <td>{user.username}</td>
                <td className="cursor">
                  <Modal
                    className="teal-text"
                    trigger={
                      <a>delete</a>
                       }
                  >
                    <span> Are You Sure You Want To Delete Role? </span>
                    <button
                      onClick={() => this.deleteUser(user.id)}
                      className="btn pink darken-4 white-text right"
                    >Yes</button>
                  </Modal></td>
                <td className="styleRow">
                  <UpdateUsers updateUsers={this.props.updateUsers} users={user} />
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
  updateUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.any.isRequired,
};

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    users: state.users,
    roles: state.roles
  };
}

export default connect(mapStateToProps,
{ getUsers, createUsers, deleteUser, updateUsers, getRoles })(ManageUsers);
