import React from 'react';
import { Modal, Input } from 'react-materialize';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { createDocument } from '../../actions/documentActions';


/**
 *
 *
 * @class DocumentForm
 * @extends {React.Component}
 */
class DocumentForm extends React.Component {

  /**
   * Creates an instance of DocumentForm.
   * @param {any} props
   *
   * @memberOf DocumentForm
   */
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

  /**
   * 
   * 
   * @param {any} e 
   * 
   * @memberOf DocumentForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @param {any} e
   *
   * @memberOf DocumentForm
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.createDocument(this.state);
    Materialize.toast('Document Created', 4000);
  }
  
  /**
   *
   *
   * @param {any} e
   * 
   * @memberOf DocumentForm
   */
  onClick(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf DocumentForm
   */
  render() {
    const { title, content, access } = this.state;
    return (
      <Modal
        trigger={<a
          className="btn-floating btn-large waves-effect waves-white pink darken-3"
        >
          <i className="material-icons">note_add</i></a>
  }
      >
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s12">
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
          </div>
          <div className="row">
            <div className="selectWidth col s6">
              <Input
                s={6} type="select" name="access" value={access} onChange={this.onChange}
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


/**
 *
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    userInfo: state.users
  };
}


export default connect(mapStateToProps, { createDocument })(DocumentForm);
