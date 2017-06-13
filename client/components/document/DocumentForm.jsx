import React from 'react';
import { Modal, Input } from 'react-materialize';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';
import PropTypes from 'prop-types';
import { createDocument } from '../../actions/documentActions';


/**
 * React component for
 *
 * @class DocumentForm
 * @extends {React.Component}
 */
class DocumentForm extends React.Component {

  /**
   * Creates an instance of DocumentForm.
   *
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
      access: 'public',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   * onChange -  This method handles the onchange event for creating document
   *
   * @param {object} e - event handler belonging to Onchange
   * @returns {void}
   * @memberOf DocumentForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * handleEditorChange -  This method gets the content of the document type
   *
   * @param {object} event - event properties
   * belonging to updated document state
   *
   * @returns {object} document - updated content state
   */
   handleEditorChange(e) {
   this.setState({ content: e.target.getContent() });
  }
  
  /**
   * onSubmit This method creates the users document
   *
   * @param {object} e - event handler belonging to onSubmit
   * @returns {void}
   * @memberOf DocumentForm
   */
  onSubmit(e) {
    e.preventDefault();
    if(this.state.content === ''){
        Materialize.toast('Content Field Cannot Be Empty', 2000);
      }else{
          this.props.createDocument(this.state).then( () => {
          this.setState({
             title: '',
             content: ''
          });
          Materialize.toast('Document Successfully Created', 2000);
    }).catch( (err) => {
      Materialize.toast('Please Choose Access Type', 2000);
    });
    }
  }

  /**
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
          id="docButton"
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
                id="input1"
                s={12}
                className="selectBox"
                type="select"
                name="access"
                value={access} onChange={this.onChange}
                defaultValue={document.public}
                required
              >
                <option value="public" id="public">public</option>
                <option value="private">private</option>
                <option value="role">role</option>
              </Input>
            <div className="input-field col s12">
             <label><b>INPUT TITLE </b></label>
              <input
               id="input2"
                type="text"
                className="validate"
                name="title"
                value={title}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="row">
           <form>
            <div className="input-field col s12">
              <TinyMCE
                content=""
                name="content"
                value={content}
                config={{
                plugins: 'autolink link image lists code print preview',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                }}
                onChange={this.handleEditorChange}
              />
            </div>
            </form>
          </div>
          <button id="create" className="btn pink darken-4 center">Send</button>
          <button
              className="btn btn2 pink darken-4 white-text modal-action modal-close"
          >Close</button>
        </form>
      </Modal>
    );
  }
}

DocumentForm.propTypes = {
  createDocument: PropTypes.func.isRequired
};

/**
 * This method map dispatches to props
 * 
 * @returns {function} dispatch
 */
const mapStateToProps = state => ({
  userInfo: state.users
});


export default connect(mapStateToProps, { createDocument })(DocumentForm);
