/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { Pagination } from 'react-materialize';
import { getUsers, searchUsers } from '../../actions/usersAction';



/**
 *
 * React component for
 * @class ManageUsers
 * @extends {React.Component}
 */
class OtherUsers extends React.Component {

  /**
   * Creates an instance of OtherUsers.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf OtherUsers
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * componentDidMount
   * @returns {void}
   *
   * @memberOf OtherUsers
   */
  componentDidMount() {
    this.props.getUsers();
  }
  
  /**
   *
   * onChange
   * @param {object} e - event handler for search onChange
   * @returns {string} search term
   * @memberOf OtherUsers
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
   * @memberOf OtherUsers
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
   * @memberOf OtherUsers
   */
  render() {
    const { users } = this.props;
    console.log(this.props, 'hifghjkl');
    let rows = [];
    let pagination = {};
    if (users.users) {
      rows = users.users.rows;
      pagination = users.pagination;
    }
    let serialNumber= 0;
    return (
      <div className="container">
      <div className="row">
        <div className="col s12 m6 l8"><h2 className="h2">Users</h2></div>
        </div>
        <div className="row">
        <form className="col s12 m12 form-wrapper2 form-input">
          <input
            className="col s12 black-text"
            type="search"
            id="documentSearch"
            placeholder="Search for users here..."
            required
            onChange={this.onChange} name="search"
          />
         </form>
         </div>
           { users.users.rows.length > 0
        ?
        <div>
        <div className="row">
        <table className="col s12 m12 responsive-table z-depth-5 highlight tab">
          <thead className="tableHead">
            <tr>
              <th className="tablHead">S/N</th>
              <th>Email</th>
              <th id="tableName">Full Name</th>
              <th>Username</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        </div>
         <Pagination
            className="center"
            items={pagination.page_count}
            activePage={pagination.page}
            maxButtons={pagination.page_count}
            onSelect={e => this.onSelect(e)}
          />
        </div>
        : <div className="center noresult">No User found</div>
        }
      </div>
    );
  }
}

OtherUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  searchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: bindActionCreators(getUsers, dispatch),
  searchUsers: bindActionCreators(searchUsers, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps )(OtherUsers);
