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
 * React component for
 *
 * @class ManageRole
 * @extends {React.Component}
 */
class ManageRole extends React.Component {

  /**
   * Creates an instance of ManageRole.
   *
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf ManageRole
   */
  constructor(props) {
    super(props);
  }

  /**
   * componentDidMount
   *
   * @return {void}
   * @memberOf ManageRole
   */
  componentDidMount() {
    this.props.getRoles();
  }

  /**
   * deleteRole
   *
   * @param {number} roleId - role id belonging to role
   * @return {void}
   * @memberOf ManageRole
   */
  deleteRole(roleId) {
    swal({
      title: "Are you sure?", 
      text: "Are you sure that you want to delete this role?", 
      type: "error",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: "delete it!",
      confirmButtonColor: "#ad1457"
    }, (isConfirm) => {
      if(isConfirm) {
         this.props.deleteRole(roleId).then( () => {
            swal('Deleted', 'role was deleted', 'success');
         }).catch((err) => {
            Materialize.toast(err.data.message, 3000);
         })
      } else {
        swal('Canceled', 'OPERATION CANCELED', 'error');
      }
    });
  }

  /**
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
       <div className="row">
       <div className="col s12 m6 l8"><h2 className="h2">Manage Roles</h2></div>
       <div className="document-button col s12 m6 l4 "><CreateRole createRole={this.props.createRole} role={this.props.role} /></div>
       </div>
        <div className="row">
        <table className="col s12 m12 responsive-table z-depth-5 highlight tab">
          <thead className="tableHead">
            <tr>
              <th id="sn" className="roleTitle">S/N</th>
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
                            id="deleteRole"
                            onClick={(roleId) => 
                            this.deleteRole(rolei.id)}>delete role</a></td>
                    </tr>
                ))
              }
        </tbody>
        </table>
        </div>
      </div>
    );
  }
}

ManageRole.propTypes = {
  createRole: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  role: PropTypes.array.isRequired,
  deleteRole: PropTypes.func.isRequired,
};

/**
 * This method map state to props
 * 
 * @returns {function} dispatch
 */
const mapStateToProps = state => (
  {
  role: state.roles
});


export default connect(mapStateToProps, { createRole,
  getRoles,
  deleteRole,
})(ManageRole);
