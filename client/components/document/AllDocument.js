import React from 'react';
import { Modal } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import DocumentList from './DocumentListRow';
import { updateDocument, deleteDocument } from '../../actions/documentActions';


class SingleDocument extends React.Component {
  constructor(props) {

    super(props);
    this.deleteDocument = this.deleteDocument.bind(this)
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
    let document = this.state.document;
    document[field] = field === 'typeId'? Number(event.target.value): event.target.value;
    return this.setState({document});
  }

  updateDocument() {
    this.props.updateDocument(this.state.document);
  }

  render() {
    const { document } = this.props;

    const { title, content } = this.state.document;
    console.log(this.props);
    const card = {
      width: '700px',
    };
    return (
      <div className="card grey lighten-3 col s3" style={card} key={document.id}>
        <div className="card-content">
          <h2 className="card-title">{document.title}</h2>
          <p>{document.content}</p>
        </div>
        <div className="card-action">
          <ul>
            <li><a
              onClick={this.deleteDocument.bind(this)}
              className="btn-floating btn grey lighten-5 right"
            ><i className="material-icons red-text">delete</i></a>
            
              <Modal
                header="edit document"
                className="teal-text"
                fixedFooter
                trigger={
                  <a className="btn-floating btn grey lighten-5 right"><i className="material-icons pink-text">mode_edit</i></a>
  }
              >
                <div className="row">
                  <form>
                        <div className="input-field col s6">
                          <textarea
                            className="materialize-textarea"
                            name="title"
                            value={title}
                            onChange={(e) => this.updateDocumentState(e)}
                          />
                        </div>
                      </form>
                </div>
                <div className="row">
                  <form>
                        <div className="input-field col s6">
                          <textarea
                            className="materialize-textarea"
                            name="content"
                            value={content}
                            onChange={(e) => this.updateDocumentState(e)}
                          />
                        </div>
                      </form>
                </div>
                 <button onClick={() => this.updateDocument()}>Update and Save</button></Modal></li>
          </ul>
        </div>
      </div>
    );
  }
}

SingleDocument.propTypes = {
  deleteDocument: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteDocument: bindActionCreators(deleteDocument, dispatch),
  updateDocument: bindActionCreators(updateDocument, dispatch)
});

export default connect(null, mapDispatchToProps)(SingleDocument);
