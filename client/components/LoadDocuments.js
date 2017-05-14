import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import AllDocument from './document/AllDocument';
import { loadDocuments, getDocument, deleteDocument, updateDocument } from '../actions/documentActions';
import Footer from './Footer';
import DocumentListRow from './document/DocumentListRow';

class DashBoard extends React.Component {

  componentDidMount() {
     this.props.loadDocuments();
  }

  render() {
    const documents = this.props.docs;
    console.log(documents);
    return (
      <div>
        <div className="container">
          <Link to="/dashboardpage">Return to Home Page</Link>
          <DocumentListRow />
          <i className="material-icons prefix document">library_books</i>
          <div className="row">
            { documents.documents.map(doc => <AllDocument
              key={doc.document}
              document={doc}
              deleteDocument={this.props.deleteDocument}
            />)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  docs: state.documents
});

const mapDispatchToProps = dispatch => ({
  loadDocuments: bindActionCreators(loadDocuments, dispatch),
  getDocument: bindActionCreators(getDocument, dispatch),
  deleteDocument: bindActionCreators(deleteDocument, dispatch),
  updateDocument: bindActionCreators(deleteDocument, dispatch)
});

DashBoard.propTypes = {
  deleteDocument: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
