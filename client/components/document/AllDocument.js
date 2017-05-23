import React from 'react';
import { Modal } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';
import { updateDocument, deleteDocument } from '../../actions/documentActions';
import { hasDocumentPermission } from '../../utils/helpers';


/**
 *
 *
 * @class AllDocument
 * @extends {React.Component}
 */
class AllDocument extends React.Component {

  /**
   * Creates an instance of AllDocument.
   * @param {any} props
   *
   * @memberOf AllDocument
   */
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.state = {
      document: {
        content: props.document.content || '',
        title: props.document.title || '',
        id: props.document.id
      },
    };
  }

  /**
   *
   * 
   * 
   * @memberOf AllDocument
   */
  deleteDocument() {
    Materialize.toast('Document Deleted', 4000);
    this.props.deleteDocument(this.props.document.id);
  }

  /**
   * 
   * 
   * @param {any} event 
   * @returns
   * 
   * @memberOf AllDocument
   */
  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  /**
   * 
   * 
   * 
   * @memberOf AllDocument
   */
  updateDocument() {
    Materialize.toast('Update Successfull', 4000);
    this.props.updateDocument(this.state.document);
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf AllDocument
   */
  render() {
    const { document } = this.props;
    const { title, content } = this.state.document;
    const singleDocUrl = `document/${document.id}`;
    const userInfo = this.props.document;
    const dateCreated = moment(userInfo.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const lastUpdated = moment(userInfo.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <div>
        <div className="card docCard col s4" key={document.id}>
          <div className="card-content cardContent">
            <div className="card-title cardTitle">{document.title.substring(0, 20)}</div>
            <p>{document.content.substring(0, 20)}...</p>
            <Link to={singleDocUrl}>Read more</Link>
          </div>
          <div className="card-action">
            <p className="documentDate">Access Type: {document.access}</p>
            <p className="documentDate">Created On: {dateCreated}</p>
            <p className="documentDate">Last Updated: {lastUpdated}</p>
            {hasDocumentPermission(document.ownerId) ? <ul>
              <li>
                <Modal
                  className="teal-text"
                  trigger={
                    <a className="btn-floating btn grey lighten-5  right">
                      <i className="material-icons red-text">delete</i></a>
                       }
                >
                  <span> Are You Sure You Want To Delete Document? </span>
                  <button
                    onClick={this.deleteDocument}
                    className="btn pink darken-4 white-text right"
                  >Yes</button>
                </Modal>
                <Modal
                  className="teal-text"
                  fixedFooter
                  trigger={
                    <a className="btn-floating btn pink darken-4 right">
                      <i className="material-icons">mode_edit</i></a>
  }
                >
                  <div className="row">
                    <form>
                      <div className="input-field col s10">
                        <textarea
                          className="materialize-textarea"
                          name="title"
                          value={title}
                          onChange={e => this.updateDocumentState(e)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <form>
                      <div className="input-field col s10">
                        <textarea
                          className="materialize-textarea"
                          name="content"
                          value={content}
                          onChange={e => this.updateDocumentState(e)}
                        />
                      </div>
                    </form>
                  </div>
                  <button onClick={() => this.updateDocument()} className="btn pink darken-4 white-text">Update</button>
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
  deleteDocument: propTypes.func.isRequired,
  updateDocument: propTypes.func.isRequired,
  document: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteDocument: bindActionCreators(deleteDocument, dispatch),
  updateDocument: bindActionCreators(updateDocument, dispatch)
});

export default connect(null, mapDispatchToProps)(AllDocument);
