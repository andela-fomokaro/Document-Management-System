import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';
import DocumentList from './DocumentListRow';


class SingleDocument extends React.Component {
  deleteDocument() {
    this.props.deleteDocument(this.props.document.id);
  }

  updateDocumentState(event) {
    const field = event.target.name;
    let document = this.state.document;
    document[field] = field === 'typeId'? Number(event.target.value): event.target.value;
    return this.setState({document});
  }

  render() {
    const { document } = this.props;
    const card = {
      width: '700px',
    };
    return (
      <div className="container">
      <div className="card grey lighten-3 col s3" style={card}>
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
                            name="content"
                            value={document.title}
                            onChange={this.updateDocumentState.bind(this)}
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
                            value={document.content}
                            onChange={this.updateDocumentState.bind(this)}
                          />
                        </div>
                      </form>
                </div>
                 <button>Update and Save</button></Modal></li>
          </ul>
        </div>
      </div>
      </div>
    );
  }
}

SingleDocument.propTypes = {
  deleteDocument: propTypes.func.isRequired,
};

export default SingleDocument;
