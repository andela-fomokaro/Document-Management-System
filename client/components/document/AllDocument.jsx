/* eslint-disable no-undef*/
import React from 'react';
import { Modal } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { updateDocument, deleteDocument } from '../../actions/documentActions';
import { hasDocumentPermission } from '../../utils/helpers';


/**
 *
 * React component for
 * @class AllDocument
 * @extends {React.Component}
 */
class AllDocument extends React.Component {

  /**
   * Creates an instance of AllDocument.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf AllDocument
   */
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.state = {
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access,
      id: this.props.document.id
    };
  }

  /**
   *
   * deleteDocument
   *
   * @memberOf AllDocument
   *
   * @return {void}
   */
   
  deleteDocument() {
     swal({
      title: "Are you sure?", 
      text: "Are you sure that you want to delete this document?", 
      type: "error",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: "Delete it!",
      confirmButtonColor:  "#ad1457"
    }, (isConfirm) => {
      if(isConfirm) {
         this.props.deleteDocument(this.props.document.id);
         swal('Deleted', 'Document was deleted', 'success');
         Materialize.toast('Document Deleted', 1000);
      } else {
        swal('Canceled', 'OPERATION CANCELED', 'error');
      }
    });
  }

  /**
   *
   *
   * @param {object} event - event properties
   * belonging to updated document state
   *
   * @returns {object} document - updated document state
   *
   * @memberOf AllDocument
   */
  updateDocumentState(event) {
    return this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleEditorChange(event) {
    return this.setState({
      content: event.target.getContent()
    });
  }

  /**
   *
   * @returns {void}
   *
   * @memberOf AllDocument
   */
  updateDocument() {
    Materialize.toast('Update Successful', 4000);
    console.log(this.state);
    this.props.updateDocument(this.state);
  }


  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf AllDocument
   */
  render() {
    const { document } = this.props;
    const {id } = this.state;
    const singleDocUrl = `document/${id}`;
    const { title, content, access } = document ;
    return (
      <div>
        <div className="card docCard col s4" key={document.id}>
          <div className="card-content cardContent">
            <div className="card-title cardTitle">
              {document.title.substring(0, 10)}</div>
            <p className="marky" dangerouslySetInnerHTML={{__html: document.content}} />
            <Link to={singleDocUrl}>Read more</Link>
          </div>
          <div className="card-action">
            {hasDocumentPermission(document.ownerId) ? <ul>
              <li>
                    <a id="userDocDelete"
                     onClick={this.deleteDocument}
                     className="btn-floating grey lighten-5 right"
                     >
                      <i className="material-icons red-text">delete</i></a>
                <Modal
                  header='Update Document'
                  className="teal-text"
                  fixedFooter
                  trigger={
                    <a className="btn-floating pink darken-4 right">
                      <i className="material-icons">mode_edit</i></a>
  }
                >
                  <div className="row">
                    <form>
                     <label className="red-text">Title</label>
                      <div className="input-field col s12">
                        <textarea
                          className="materialize-textarea"
                          name="title"
                          defaultValue={title}
                          onChange={this.updateDocumentState}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <form>
                    <label className="red-text">Content</label>
                      <div className="input-field col s12">
                         <TinyMCE
                        content={content}
                        name="content"
                        config={{
                        plugins: 'autolink link image lists code print preview',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                       }}
                       onChange={this.handleEditorChange}
                      />
                      </div>
                    </form>
                  </div>
                   <label className="red-text">Access</label>
                  <div className="row">
                    <form>
                      <div className="input-field col s12">
                        <textarea
                          className="materialize-textarea"
                          name="access"
                          value={access}
                          onChange={this.updateDocumentState}
                        />
                      </div>
                    </form>
                  </div>
                  <button
                    onClick={() => this.updateDocument()}
                    className="update-btn btn pink darken-4 white-text modal-action modal-close"
                  >Update</button>
                </Modal>
              </li>
            </ul> : ''}
          </div>
        </div>
      </div>
    );
  }
}

AllDocument.propTypes = {
  deleteDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteDocument: bindActionCreators(deleteDocument, dispatch),
  updateDocument: bindActionCreators(updateDocument, dispatch)
});

export default connect(null, mapDispatchToProps)(AllDocument);
