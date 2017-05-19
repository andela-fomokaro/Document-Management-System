import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';

class UpdateRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.role.title || '',
      id: this.props.role.id
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateRole(this.state);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateRoleState(event) {
    const field = event.target.name;
    const newTitle = field === 'typeId' ? Number(event.target.value) : event.target.value;
    return this.setState({ title: newTitle, id: this.state.id });
  }

  render() {
    return (
      <Modal
        fixedFooter
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
