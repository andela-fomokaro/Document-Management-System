/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-materialize';

import CreateRole from './CreateRole.jsx';
import UpdateRole from './UpdateRole.jsx';
import { createRole, getRoles, deleteRole, updateRole } from '../../actions/roleActions';

/**
 *
 * React component for
 * @class ManageRole
 * @extends {React.Component}
 */
class ManageRole extends React.Component {

  /**
   * Creates an instance of ManageRole.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf ManageRole
   */
  constructor(props) {
    super(props);
    this.deleteRole = this.deleteRole.bind(this);
  }

  /**
   *
   * componentDidMount
   * @return {void}
   * @memberOf ManageRole
   */
  componentDidMount() {
    this.props.getRoles();
  }

  /**
   *
   * deleteRole
   * @param {number} roleId - role id belonging to role
   * @return {void}
   * @memberOf ManageRole
   */
  deleteRole(roleId) {
    Materialize.toast('Role Deleted', 4000);
    this.props.deleteRole(roleId);
  }

  /**
   *
   * updateRole
   * @return {void}
   * @memberOf ManageRole
   */
  updateRole() {
    this.props.updateRole();
  }

  /**
   *
   *
   * @returns {object} reacty components to render
   *
   * @memberOf ManageRole
   */
  render() {
    const roleInfo = this.props.role;
    const createdAt = moment(roleInfo.createdAt)
    .format('MMMM Do YYYY, h:mm:ss a');
    const updatedAt = moment(roleInfo.updatedAt)
    .format('MMMM Do YYYY, h:mm:ss a');
    const allRoles = this.props.role.map(role => (
      <tr key={role.id}>
        <td>{role.title}</td>
        <td>{createdAt}</td>
        <td>{updatedAt}</td>
        <td className="cursor">

          <Modal
            className="teal-text"
            trigger={
              <a>delete</a>
                       }
          >
            <span id="roleDeleteWord">
              Are You Sure You Want To Delete Role? </span>
            <button
              onClick={this.deleteDocument}
              id="deleteRole"
              className="btn pink darken-4 white-text right"
            >Yes</button>
          </Modal></td>
        <td><UpdateRole updateRole={this.props.updateRole} role={role} /></td>
      </tr>
      ));

    return (
      <div className="container">
        <table className="z-depth-5 striped tab">
          <thead className="tableHead">
            <tr>
              <th id="roleTitle">Title</th>
              <th id="timeCreated">Time Created</th>
              <th id="lastUpdated">Last Updated</th>
              <th>Delete role</th>
              <th>Update role</th>
            </tr>
          </thead>
          <tbody>
            {allRoles}
          </tbody>
        </table>
        <CreateRole createRole={this.props.createRole} role={this.props.role} />
      </div>
    );
  }
}

ManageRole.propTypes = {
  createRole: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  role: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  role: state.roles
});


export default connect(mapStateToProps, { createRole,
  getRoles,
  deleteRole,
  updateRole })(ManageRole);
