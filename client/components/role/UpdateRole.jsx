import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';

/**
 *
 * React component for
 * @class UpdateRole
 * @extends {React.Component}
 */
class UpdateRole extends React.Component {

  /**
   * Creates an instance of UpdateRole.
   * Constructor
   * @param {object} props
   *
   * @memberOf UpdateRole
   */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.role.title || '',
      id: this.props.role.id
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * onSubmit
   * @param {any} e - event handler for onSubmit
   * @returns {void}
   *
   * @memberOf UpdateRole
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.updateRole(this.state);
  }

  /**
   *
   * onChange
   * @param {any} e - event handler for onChange
   * @returns {void}
   * @memberOf UpdateRole
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @param {any} event - event handler for update role state
   * @returns {object}  role - update role state
   *
   * @memberOf UpdateRole
   */
  updateRoleState(event) {
    const field = event.target.name;
    let newTitle = field;
    if (newTitle) {
      newTitle = event.target.value;
    }
    return this.setState({ title: newTitle, id: this.state.id });
  }

  /**
   *
   *
   * @returns {object} react components to render
   *
   * @memberOf UpdateRole
   */
  render() {
    return (
      <Modal
        trigger={
          <a
          id="updateRole"
          className="updateBtn">
            Click to update role</a>
  }
      >
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="input-field col s12">
            <input
              type="text"
              className="validate"
              name="title"
              value={this.state.title}
              onChange={e => this.updateRoleState(e)}
            />
          </div>
          <button
          id="updateRoleButton"className="
          btn pink darken-4">Update</button>
        </form>
      </Modal>
    );
  }
}

UpdateRole.propTypes = {
  updateRole: PropTypes.func.isRequired,
  role: PropTypes.object.isRequired
};

export default UpdateRole;
