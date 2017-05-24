/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal, Pagination } from 'react-materialize';
import { getUsers, createUsers, deleteUser, updateUsers, getRoles, searchUsers, userPagination } from '../../actions/usersAction';
import CreateUsers from './CreateUsers';
import UpdateUsers from './UpdateUsers';


/**
 *
 * React component for
 * @class ManageUsers
 * @extends {React.Component}
 */
class ManageUsers extends React.Component {

  /**
   * Creates an instance of ManageUsers.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf ManageUsers
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * componentDidMount
   * @returns {void}
   *
   * @memberOf ManageUsers
   */
  componentDidMount() {
    this.props.getUsers();
  }

  /**
   *
   * onChange
   * @param {any} e - event handler for search onChange
   * @returns {string} search term
   * @memberOf ManageUsers
   */
  onChange(e) {
    const searchTerm = e.target.value;
    if (searchTerm.length < 1 || undefined) {
      this.props.getUsers();
      Materialize.toast('Search does not match', 1000);
    } else {
      this.props.searchUsers(searchTerm);
    }
  }

  /**
   *
   * onSelect
   * @param {number} pageNo
   * @return {void}
   * @memberOf ManageUsers
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 6;
    this.props.getUsers(offset);
  }
    /**
   *
   * updateUser
   * @returns {void}
   * @memberOf ManageUsers
   */
  updateUser() {
    this.props.updateUsers();
  }

  /**
   *
   * deleteUser
   * @param {number} userId - user id
   * @returns {void}
   * @memberOf ManageUsers
   */
  deleteUser(userId) {
    Materialize.toast('User Deleted', 3000);
    this.props.deleteUser(userId);
  }

  /**
   *
   *
   * @returns {void}
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
        <form className="form-wrapper2 cf" onSubmit={this.onSubmit}>
          <input
            className="black-text"
            type="search"
            placeholder="Search for users here..."
            required
            onChange={this.onChange} name="search"
          />
        </form>
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
            {users.map(user => (
              <tr className="styleRow">
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
        {/* <Pagination items={20} activePage={1} maxButtons={10} onSelect={e => this.onSelect(e)} />*/}
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
  searchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
  roles: state.roles
});

export default connect(mapStateToProps,
  { getUsers,
    createUsers,
    deleteUser,
    updateUsers,
    getRoles,
    searchUsers,
    userPagination })(ManageUsers);
