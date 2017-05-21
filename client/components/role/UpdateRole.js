import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';

/**
 * 
 * 
 * @class UpdateRole
 * @extends {React.Component}
 */
class UpdateRole extends React.Component {

  /**
   * Creates an instance of UpdateRole.
   * @param {any} props 
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
   * 
   * @param {any} e 
   * 
   * @memberOf UpdateRole
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.updateRole(this.state);
  }

  /**
   * 
   * 
   * @param {any} e 
   * 
   * @memberOf UpdateRole
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * 
   * @param {any} event 
   * @returns 
   * 
   * @memberOf UpdateRole
   */
  updateRoleState(event) {
    const field = event.target.name;
    const newTitle = field === 'typeId' ? Number(event.target.value) : event.target.value;
    return this.setState({ title: newTitle, id: this.state.id });
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf UpdateRole
   */
  render() {
    return (
      <Modal
        trigger={
          <a className="updateBtn">Click to update role</a>
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
          <button className=" btn pink darken-4">Update</button>
        </form>
      </Modal>
    );
  }
}

UpdateRole.propTypes = {
  updateRole: propTypes.func.isRequired
};

export default UpdateRole;
