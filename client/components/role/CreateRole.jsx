import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';

/**
 * React component for
 *
 * @class CreateRole
 * @extends {React.Component}
 */
class CreateRole extends React.Component {

  /**
   * Creates an instance of CreateRole.
   * @param {object} props
   *
   * @memberOf CreateRole
   */
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * onSubmit
   * @param {any} e - event hhandler belonging to onSubmit
   * @returns {void}
   * @memberOf CreateRole
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.createRole(this.state);
  }

  /**
   *
   * onChange
   * @param {any} e - event handler belonging to change
   * @returns {void}
   * @memberOf CreateRole
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns {object} react component to render
   *
   * @memberOf CreateRole
   */
  render() {
    const { title } = this.state;
    return (
      <Modal
        trigger={
          <a
          id="adminCreateRole"
          className="btn-floating btn-large docButton pink darken-3 tooltipped"
          data-position="left" data-delay="10" data-tooltip="Click to create new role">
           <i className="material-icons">note_add</i></a>
  }
      >
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="input-field col s12">
            <input
              type="text"
              className="validate"
              name="title"
              value={title}
              onChange={this.onChange}
            />
            <label htmlFor="icon_prefix">Add Title To Create New Role.....</label>
          </div>
          <button id="createRole" className="btn pink darken-4 modal-action modal-close">Send</button>
        </form>
      </Modal>
    );
  }
}

CreateRole.propTypes = {
  createRole: propTypes.func.isRequired
};
export default CreateRole;
