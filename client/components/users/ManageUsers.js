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
 *
 * @class ManageUsers
 * @extends {React.Component}
 */
class ManageUsers extends React.Component {

  /**
   * Creates an instance of ManageUsers.
   * @param {any} props
   *
   * @memberOf ManageUsers
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
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

  onChange(e) {
    const searchTerm = e.target.value;
    if (searchTerm.length < 1) {
      this.props.getUsers();
    } else {
      this.props.searchUsers(searchTerm);
    }
  }

  /**
   *
   *
   * @param {any} pageNo
   *
   * @memberOf ManageUsers
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 6;
    this.props.getUsers(offset);
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
    // const { pagination } = this.props.users;
    console.log(this.props, 'xdfcghvbjknl;');
    return (
      <div className="manageUser">
        <form className="form-wrapper2 cf" onSubmit={this.onSubmit}>
          <input
            type="search"
            placeholder="Search for users here..."
            required
            onChange={this.onChange} name="search"
          />
          <button type="submit">Search</button>
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
        {/*<Pagination items={20} activePage={1} maxButtons={10} onSelect={e => this.onSelect(e)} />*/}
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
  { getUsers,
    createUsers,
    deleteUser,
    updateUsers,
    getRoles,
    searchUsers,
    userPagination })(ManageUsers);
