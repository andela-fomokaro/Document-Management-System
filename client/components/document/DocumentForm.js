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
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.createDocument(this.state);
  }
  render() {
    const { title, content, access, errors, isLoading } = this.state;
    return (
      <Modal
        fixedFooter
        trigger={
          <a className="btn-floating btn-large waves-effect waves-white pink darken-3 right"><i className="material-icons">add</i></a>
  }
      >
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix pink-text">toc</i>
              <input
                type="text"
                className="validate"
                name="title"
                value={title}
                onChange={this.onChange}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix pink-text">mode_edit</i>
              <textarea
                className="materialize-textarea"
                name="content"
                value={content}
                onChange={this.onChange}
              />
              <label htmlFor="icon_prefix2">Content</label>
            </div>
          </div>
          <Row>
            <Input
              s={12} type="select" name="access" label="Select Access" onChange={onChange}
              defaultValue={document.access}
            >
              <option value="" disabled selected>Select Access</option>
              <option value="public" >Public</option>
              <option value="private">Private</option>
            </Input>
          </Row>

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
