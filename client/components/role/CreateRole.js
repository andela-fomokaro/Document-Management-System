import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';

/**
 * 
 * 
 * @class CreateRole
 * @extends {React.Component}
 */
class CreateRole extends React.Component {

  /**
   * Creates an instance of CreateRole.
   * @param {any} props 
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
   * 
   * @param {any} e 
   * 
   * @memberOf CreateRole
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.createRole(this.state);
  }

  /**
   * 
   * 
   * @param {any} e 
   * 
   * @memberOf CreateRole
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf CreateRole
   */
  render() {
    const { title } = this.state;
    return (
      <Modal
        trigger={
          <a className="btn pink darken-4 white-text right right up btnUp">Create Role</a>
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
          <button className=" btn pink darken-4">Send</button>
        </form>
      </Modal>
    );
  }
}

CreateRole.propTypes = {
  createRole: propTypes.func.isRequired
};
export default CreateRole;
