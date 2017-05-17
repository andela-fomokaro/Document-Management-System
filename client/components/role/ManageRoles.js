import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CreateRole from './CreateRole';
import { createRole, getRoles, deleteRole } from '../../actions/roleActions';

class ManageRole extends React.Component {
  constructor(props) {
    super(props);
    this.deleteRole = this.deleteRole.bind(this);
  }

  componentDidMount() {
    this.props.getRoles();
  }

  deleteRole(roleId) {
    this.props.deleteRole(roleId);
  }

  render() {
    const allRoles = this.props.role.map(role => (
      <tr key={role.id}>
        <td>{role.title}</td>
        <td>{role.createdAt}</td>
        <td>{role.updatedAt}</td>
        <td><a onClick={() => this.deleteRole(role.id)}>Delete</a></td>
      </tr>
      ));
    return (
      <div className="container">
        <table className="z-depth-5 tabs">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Update</th>
              <th>Delete Role</th>
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
  deleteRole: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  role: state.roles
});

// const mapDispatchToProps = dispatch => ({
//   creatRole: bindActionCreators(creatRole, dispatch),
//   getRoles: bindActionCreators(getRoles, dispatch),
// });


export default connect(mapStateToProps, { createRole, getRoles, deleteRole })(ManageRole);
