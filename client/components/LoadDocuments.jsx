import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; // read about bindActionCreators REMEMBER
import { Pagination } from 'react-materialize';
import propTypes from 'prop-types';
import DocumentForm from './document/DocumentForm.jsx';
import AllDocument from './document/AllDocument.jsx';
import
{ loadDocuments, getDocument, deleteDocument, updateDocument, searchDocument }
from '../actions/documentActions';


/**
 *
 * React component for
 * @class DashBoard
 * @extends {React.Component}
 */
class DashBoard extends React.Component {

  /**
   * Creates an instance of DashBoard.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf DashBoard
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  /**
   *
   * componentDidMount
   * @returns {void}
   *
   * @memberOf DashBoard
   */
  componentDidMount() {
    this.props.loadDocuments();
  }

  /**
   *
   * onSelect
   * @param {number} pageNo
   *
   * @returns {void}
   *
   * @memberOf DashBoard
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 6;
    this.props.loadDocuments(offset);
  }

  /**
   *
   * onChange
   * @param {any} e - event handler belonging to Onchange
   * @memberOf DashBoard
   */
  onChange(e) {
    const searchTerm = e.target.value;
    if (searchTerm.length < 1) {
      this.props.loadDocuments();
    } else {
      this.props.searchDocument(searchTerm);
    }
  }
  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf DashBoard
   */
  render() {
    const documents = this.props.docs;
    const { pagination } = this.props.docs;
    return (
      <div className="container">
        <form className="form-wrapper cf" onSubmit={this.onSubmit}>
          <input
            type="search" placeholder="Search for document here..."
            onChange={this.onChange} name="search"
            required
          />
          <button type="submit">Search</button>
        </form>
        <DocumentForm />
        <div className="row">
          { documents.documents.map((doc, index) => <AllDocument
            key={index}
            document={doc}
            deleteDocument={this.props.deleteDocument}
          />)}
        </div>
        <Pagination
        items={pagination.page_count}
        activePage={pagination.page}
        maxButtons={pagination.page_count}
        onSelect={e => this.onSelect(e)} />
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
  updateDocument: bindActionCreators(updateDocument, dispatch),
  searchDocument: bindActionCreators(searchDocument, dispatch),
});

DashBoard.propTypes = {
  deleteDocument: propTypes.func.isRequired,
  loadDocuments: propTypes.func.isRequired,
  searchDocument: propTypes.func.isRequired,
  docs: propTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
