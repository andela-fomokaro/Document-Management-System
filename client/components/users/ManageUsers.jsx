/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { Modal, Pagination } from 'react-materialize';
import { getUsers, createUsers, deleteUser, updateUser, searchUsers } from '../../actions/usersAction';
import { getRoles } from '../../actions/roleActions';
import CreateUsers from './CreateUsers.jsx';
import UpdateRole from './UpdateRole.jsx';


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
    this.props.getRoles();
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
    this.props.updateUser();
  }

  /**
   *
   * deleteUser
   * @param {number} userId - user id
   * @returns {void}
   * @memberOf ManageUsers
   */
  deleteUser(userId) {
     swal({
      title: "Are you sure?", 
      text: "Are you sure that you want to delete this user?", 
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    }, (isConfirm) => {
      if(isConfirm) {
         this.props.deleteUser(userId);
        swal('Deleted', 'role was deleted', 'success');
      } else {
        swal('Canceled', 'OPERATION CANCELED', 'error');
      }
    });
  }

  /**
   *
   * onSelect
   * @param {number} pageNo
   *
   * @returns {void}
   *
   * @memberOf DashBoard
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 6;
    this.props.getUsers(offset);
  }
 
  /**
   *
   *
   * @returns {void}
   *
   * @memberOf ManageUsers
   */
  render() {
    const { users, roles } = this.props;
    let rows = [];
    let pagination = {};
    if (users.users) {
      rows = users.users.rows;
      pagination = users.pagination;
    }
    let serialNumber= 0;
    return (
      <div>
        <form className="form-wrapper2 cf" onSubmit={this.onSubmit}>
          <input
            className="black-text"
            type="search"
            id="documentSearch"
            placeholder="Search for users here..."
            required
            onChange={this.onChange} name="search"
          />
        </form>
        <CreateUsers createUsers={this.props.createUsers} users={this.props.users} />
        <div className="manageUser">
        <table className="z-depth-5 highlight tab">
          <thead className="tableHead">
            <tr>
              <th className="tablHead">S/N</th>
              <th>Email</th>
              <th id="tableName">Full Name</th>
              <th>Username</th>
              <th>Delete</th>
              <th id="updateRole">Update Role</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user, id)=> (
               serialNumber += 1,
              <tr className="styleRow" key={user.id}>
                <td className="tablHead">{serialNumber}</td>
                <td>{user.email}</td>
                <td>{user.fullNames}</td>
                <td id="searchUsername">{user.username}</td>
                <td> <a className="cursor"
                        onClick={(userId) => {
                        this.deleteUser(user.id)
                        }
                      }
                      >
                     <i  className="material-icons userIcon">delete</i>
               </a></td> 
                <td className="styleRow">
                  <UpdateRole updateUser={this.props.updateUser} user={user} roles={roles} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
         <Pagination
            items={pagination.page_count}
            activePage={pagination.page}
            maxButtons={pagination.page_count}
            onSelect={e => this.onSelect(e)}
          />
      </div>
    );
  }
}

ManageUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  createUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.any.isRequired,
  searchUsers: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  roles: state.roles
});

const mapDispatchToProps = dispatch => ({
  getUsers: bindActionCreators(getUsers, dispatch),
  createUsers: bindActionCreators(createUsers, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  deleteUser: bindActionCreators(deleteUser, dispatch),
  searchUsers: bindActionCreators(searchUsers, dispatch),
  getRoles: bindActionCreators(getRoles, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps )(ManageUsers);
