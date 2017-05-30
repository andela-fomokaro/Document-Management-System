/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-materialize';
import CreateRole from './CreateRole.jsx';
import UpdateRole from './UpdateRole.jsx';
import { createRole, getRoles, deleteRole } from '../../actions/roleActions';

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
    swal({
      title: "Are you sure?", 
      text: "Are you sure that you want to delete this role?", 
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    }, (isConfirm) => {
      if(isConfirm) {
         this.props.deleteRole(roleId);
        swal('Deleted', 'role was deleted', 'success');
      } else {
        swal('Canceled', 'OPERATION CANCELED', 'error');
      }
    });
  }

  /**
   *
   *
   * @returns {object} reacty components to render
   *
   * @memberOf ManageRole
   */
  render() {
    const { role } = (this.props);
    const roleInfo = this.props.role;
    let serialNumber= 0;
    return (
      <div className="container">
       <CreateRole createRole={this.props.createRole} role={this.props.role} />
        <table className="z-depth-5 highlight tab">
          <thead className="tableHead">
            <tr>
              <th id="roleTitle" className="roleTitle">S/N</th>
              <th id="roleTitle" className="roleTitle">Title</th>
              <th id="timeCreated">Time Created</th>
              <th id="lastUpdated">Last Updated</th>
              <th>Delete role</th>
            </tr>
          </thead>
          <tbody>
              {
                role.map(rolei => (
                    serialNumber += 1,
                    <tr key={rolei.id}>
                      <th className="roleTitle">{serialNumber}</th>
                      <td>{rolei.title}</td>
                      <td>
                          {
                            moment(rolei.createdAt)
                            .format('MMMM Do YYYY')
                            }
                        </td>
                      <td>
                          {
                            moment(rolei.updatedAt)
                            .format('MMMM Do YYYY, h:mm:ss a')
                            }
                        </td>
                      <td className="cursor"><a
                            onClick={(roleId) => 
                            this.deleteRole(rolei.id)}>delete role</a></td>
                    </tr>
                ))
              }
        </tbody>
        </table>
      </div>
    );
  }
}

ManageRole.propTypes = {
  createRole: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  role: PropTypes.any.isRequired,
  deleteRole: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
  role: state.roles
});


export default connect(mapStateToProps, { createRole,
  getRoles,
  deleteRole,
})(ManageRole);
