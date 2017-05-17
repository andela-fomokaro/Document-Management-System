import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';

class CreateRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createRole(this.state);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { title } = this.state;
    return (
      <Modal
        fixedFooter
        trigger={
          <a className="pulse btn-floating btn-large waves-effect waves-white pink darken-3 right up btnUp">
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
            <label htmlFor="icon_prefix">Title</label>
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
