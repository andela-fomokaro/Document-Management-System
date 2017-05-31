/* eslint-disable no-undef*/
import React from 'react';
import { Modal, Row, Input } from 'react-materialize';
import { PropTypes } from 'prop-types';

/**
 *
 * React component for
 * @class UpdateUsers
 * @extends {React.Component}
 */
class UpdateRole extends React.Component {

  /**
   * Creates an instance of UpdateUsers.
   * React component for
   * @param {object} props - props of the component
   *
   * @memberOf UpdateUsers
   */
  constructor(props) {
    super(props);
    this.state = this.props.user;

    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * onChange
   * @param {any} e - event handler for onSubmi
   * @returns {void}
   * @memberOf UpdateUsers
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.props.updateUser(this.state, this.state.id);
  }

  /**
   *
   * updateUserState
   * @param {any} event - event handler for onSubmi
   * @returns {object} - updated state of users
   *
   * @memberOf UpdateUsers
   */
  updateUserState(event) {
    const field = event.target.name;
    const userField = this.state.users;
    userField[field] = event.target.value;
    return this.setState({ userField });
  }
  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf UpdateUsers
   */
  render() {
    const { role } = this.state;

    const rolesOptions = this.props.roles.map((role, index) => { return <option key={index} value={role.id}>{role.title}</option> });
    return (
      <form>
      <Row>
                    <Input
                      s={12}
                      type="select"
                      name="roleId"
                      required
                      value={this.props.user.roleId}
                      onChange={this.onChange}
                      defaultValue={this.props.user.roleId}
                    >
                      {rolesOptions}
                    </Input>
                  </Row>
      </form>
    );
  }
}

UpdateRole.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired,
  roles: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  roles: state.roles
});

export default UpdateRole;
