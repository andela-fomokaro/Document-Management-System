import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; // read about bindActionCreators
import { Pagination } from 'react-materialize';
import propTypes from 'prop-types';
import AllDocument from './document/AllDocument';
import { loadDocuments, getDocument, deleteDocument, updateDocument } from '../actions/documentActions';

class DashBoard extends React.Component {

  componentDidMount() {
    this.props.loadDocuments();
  }

  onSelect(pageNo) {
    const offset = (pageNo - 1) * 6;
    this.props.loadDocuments(offset);
  }

  render() {
    const documents = this.props.docs;
    const { pagination } = this.props.docs;
    return (
      <div className="container">
        <form className="form-wrapper cf">
          <input type="search" placeholder="Search for document here..." required />
          <button type="submit">Search</button>
        </form>
        <div className="row">
          { documents.documents.map((doc, index) => <AllDocument
            key={index}
            document={doc}
            deleteDocument={this.props.deleteDocument}
          />)}
        </div>
        <Pagination items={pagination.page_count} activePage={pagination.page} maxButtons={10} onSelect={e => this.onSelect(e)} />
      </div>
    );
  }
}


function mapStateToProps(state) {
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
  loadDocuments: propTypes.func.isRequired,
  docs: propTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
