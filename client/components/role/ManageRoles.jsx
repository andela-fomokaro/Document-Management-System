/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-materialize';
import _ from 'underscore';
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
    console.log(this.props.role);
    this.props.deleteRole(roleId);
  }

  // /**
  //  *
  //  * updateRole
  //  * @return {void}
  //  * @memberOf ManageRole
  //  */
  // updateRole() {
  //   this.props.updateRole();
  // }

  /**
   *
   *
   * @returns {object} reacty components to render
   *
   * @memberOf ManageRole
   */
  render() {
    const { role } = (this.props);
    console.log('faith', role);
    console.log(role);
    const roleInfo = this.props.role;
    return (
      <div className="container">
       <CreateRole createRole={this.props.createRole} role={this.props.role} />
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
              {
                role.map(rolei => (
                    <tr key={rolei.id}>
                      <td>{rolei.title}</td>
                      <td>
                          {
                            moment(rolei.createdAt)
                            .format('MMMM Do YYYY, h:mm:ss a')
                            }
                        </td>
                      <td>
                          {
                            moment(rolei.updatedAt)
                            .format('MMMM Do YYYY, h:mm:ss a')
                            }
                        </td>
                      <td className="cursor">

                        <Modal
                          id="mod2"
                          className="teal-text"
                          trigger={ <a>delete</a> }
                        >
                          <span id="roleDeleteWord" className="delHeader">
                            Are You Sure You Want To Delete Role? </span>
                          <div>
                          <button
                            onClick={() => this.deleteRole(rolei.id)}
                            id="deleteRole"
                            className="btn btn2 pink darken-4 white-text modal-action modal-close"
                          >Yes</button>
                          <button
                            className="btn btn2 pink darken-4 white-text modal-action modal-close"
                            >No</button>
                          </div>
                        </Modal></td>
                      <td><UpdateRole {...this.props} role={rolei} /></td>
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
  updateRole: PropTypes.func.isRequired,

};

const mapStateToProps = state => (
  {
  role: state.roles
});


export default connect(mapStateToProps, { createRole,
  getRoles,
  deleteRole,
  updateRole })(ManageRole);
