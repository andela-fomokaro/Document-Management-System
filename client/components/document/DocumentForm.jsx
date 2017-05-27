import React from 'react';
import { Modal, Input } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDocument } from '../../actions/documentActions';


/**
 *
 * React component for
 * @class DocumentForm
 * @extends {React.Component}
 */
class DocumentForm extends React.Component {

  /**
   * Creates an instance of DocumentForm.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf DocumentForm
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: 'access',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   *
   * onChange
   * @param {any} e - event handler belonging to Onchange
   * @returns {void}
   * @memberOf DocumentForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   * onSubmit
   * @param {any} e - event handler belonging to onSubmit
   * @returns {void}
   * @memberOf DocumentForm
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.createDocument(this.state);
    Materialize.toast('Document Created', 1000);
  }

  /**
   *
   * onClick
   * @param {any} e - event handler belonging to onClick
   * @returns {void}
   * @memberOf DocumentForm
   */
  onClick(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf DocumentForm
   */
  render() {
    const { title, content, access } = this.state;
    return (
      <Modal
        header='Create Document'
        trigger={<a
          className=
          "btn-floating btn-large docButton pink darken-3 tooltipped"
          data-position="right" data-delay="50" data-tooltip="Create New document"
        >
          <i className="material-icons">note_add</i></a>
  }
      >
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <Input
                s={6}
                className="selectBox"
                type="select"
                name="access"
                value={access} onChange={this.onChange}
                defaultValue={document.access}
              >
               <option value="access" disabled>CHOOSE ACCESS </option>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="role">Role</option>
              </Input>
            <div className="input-field col s12">
             <label><b>INPUT TITLE </b></label>
              <input
                type="text"
                className="validate"
                name="title"
                value={title}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="mytextarea"
                name="content"
                value={content}
                // onChange={this.onTinyMCEChange}
                // tinymceConfig={this.props.tinymceConfig}
                onChange={this.onChange}
              />
            </div>
          </div>
          <button className=" btn pink darken-4 modal-action modal-close">Send</button>
        </form>
      </Modal>
    );
  }
}

DocumentForm.propTypes = {
  createDocument: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  userInfo: state.users
});


export default connect(mapStateToProps, { createDocument })(DocumentForm);
