import React from 'react';
import { Modal } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { Link } from 'react-router';
import { updateDocument, deleteDocument } from '../../actions/documentActions';


class SingleDocument extends React.Component {
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

  deleteDocument() {
    this.props.deleteDocument(this.props.document.id);
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = field === 'typeId' ? Number(event.target.value) : event.target.value;
    return this.setState({ document });
  }

  updateDocument() {
    this.props.updateDocument(this.state.document);
  }

  render() {
    const { document } = this.props;
    const { title, content, id } = this.state.document;
    const singleDocUrl = `document/${id}`;
    return (
      <div>
        <div className="card docCard col s4" key={document.id}>
          <div className="card-content cardContent">
            <div className="card-title cardTitle">{document.title}</div>
            <p>{document.content.substring(0, 100)}...</p>
            <Link to={singleDocUrl}>Read more</Link>
          </div>
          <div className="card-action">
            <p className="documentDate">Type Of Document: {document.access}</p>
            <p className="documentDate">Created On: {document.createdAt.substring(0, 10)}</p>
            <p className="documentDate">Last Updated: {document.createdAt.substring(0, 10)}</p>
            <ul>
              <li><a
                onClick={this.deleteDocument}
                className="btn-floating btn grey lighten-5 right"
              ><i className="material-icons red-text">delete</i></a>

                <Modal
                  className="teal-text"
                  fixedFooter
                  trigger={
                    <a className="btn-floating btn grey lighten-5 right"><i className="material-icons pink-text">mode_edit</i></a>
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
                  <button onClick={() => this.updateDocument()} className="btn pink darken-4 white-text">Update</button></Modal></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

SingleDocument.propTypes = {
  deleteDocument: propTypes.func.isRequired,
  updateDocument: propTypes.func.isRequired,
  document: propTypes.any.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteDocument: bindActionCreators(deleteDocument, dispatch),
  updateDocument: bindActionCreators(updateDocument, dispatch)
});

export default connect(null, mapDispatchToProps)(SingleDocument);
