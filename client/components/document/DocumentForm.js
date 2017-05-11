import React from 'react';
import { Modal, Input, Row } from 'react-materialize';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Link from 'react-router';
import { createDocument } from '../../actions/documentActions';

class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.createDocument(this.state);
  }
  onClick(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { title, content, access } = this.state;
    return (
      <Modal
        fixedFooter
        trigger={
          <a className="btn-floating btn-large waves-effect waves-white pink darken-3 right"><i className="material-icons">note_add</i></a>
  }
      >
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix icons">mode_edit</i>
              <input
                type="text"
                className="validate"
                name="title"
                value={title}
                onChange={this.onChange}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="col s6">
              <i className="material-icons prefix icons">vpn_key</i>
              <Input
                s={6} type="select" label="Select Access" name="access" value={access} onChange={this.onChange}
                defaultValue={document.access}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="role">Role</option>
              </Input>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix icons">comment</i>
              <textarea
                className="materialize-textarea"
                name="content"
                value={content}
                onChange={this.onChange}
              />
              <label htmlFor="icon_prefix2">Content</label>
            </div>
          </div>
          <button className=" btn pink darken-4">Send</button>
        </form>
      </Modal>
    );
  }
}

DocumentForm.propTypes = {
  createDocument: propTypes.func.isRequired
};


export default connect(null, { createDocument })(DocumentForm);
