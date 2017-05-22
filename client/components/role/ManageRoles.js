import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-materialize';

import CreateRole from './CreateRole';
import UpdateRole from './UpdateRole';
import { createRole, getRoles, deleteRole, updateRole } from '../../actions/roleActions';

/**
 * 
 * 
 * @class ManageRole
 * @extends {React.Component}
 */
class ManageRole extends React.Component {

  /**
   * Creates an instance of ManageRole.
   * @param {any} props 
   * 
   * @memberOf ManageRole
   */
  constructor(props) {
    super(props);
    this.deleteRole = this.deleteRole.bind(this);
  }

  /**
   * 
   * 
   * 
   * @memberOf ManageRole
   */
  componentDidMount() {
    this.props.getRoles();
  }

  /**
   * 
   * 
   * @param {any} roleId 
   * 
   * @memberOf ManageRole
   */
  deleteRole(roleId) {
    Materialize.toast('Role Deleted', 4000);
    this.props.deleteRole(roleId);
  }

  /**
   * 
   * 
   * 
   * @memberOf ManageRole
   */
  updateRole() {
    this.props.updateRole();
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf ManageRole
   */
  render() {
    const roleInfo = this.props.role;
    const createdAt = moment(roleInfo.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const updatedAt = moment(roleInfo.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
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
            <span> Are You Sure You Want To Delete Role? </span>
            <button
              onClick={this.deleteDocument}
              className="btn pink darken-4 white-text right"
            >Yes</button>
          </Modal></td>
        <td><UpdateRole updateRole={this.props.updateRole} role={role} /></td>
      </tr>
      ));

    return (
      <div className="container">
        <table className="z-depth-5 striped tabs">
          <thead className="tableHead">
            <tr>
              <th>Title</th>
              <th>Time Created</th>
              <th>Last Updated</th>
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