import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'; // read about bindActionCreators
import { Pagination } from 'react-materialize';
import propTypes from 'prop-types';
import AllDocument from './document/AllDocument';
import { loadDocuments, getDocument, deleteDocument, updateDocument } from '../actions/documentActions';
import Footer from './Footer';
import DocumentListRow from './document/DocumentListRow';

class DashBoard extends React.Component {

  componentDidMount() {
     this.props.loadDocuments();
  }

  onSelect(pageNo){
    const offset = (pageNo-1) * 10;
     this.props.loadDocuments(offset);
  }

  render() {
    const documents = this.props.docs;
    const { pagination } = this.props.docs;
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
          <Pagination items={pagination.page_count} activePage={pagination.page} maxButtons={10} onSelect={(e) => this.onSelect(e)} />
        </div>
        <Footer />
      </div>
    )
  }
}

// const mapStateToProps = state => {({
//   docs: state.documents
// });

function mapStateToProps(state) {
  console.log(state.documents)
  return {
    docs: state.documents
  };
}

const mapDispatchToProps = dispatch => ({
  loadDocuments: bindActionCreators(loadDocuments, dispatch),
  getDocument: bindActionCreators(getDocument, dispatch),
  deleteDocument: bindActionCreators(deleteDocument, dispatch),
  updateDocument: bindActionCreators(updateDocument, dispatch)
});

DashBoard.propTypes = {
  deleteDocument: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
