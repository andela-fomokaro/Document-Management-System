/* eslint-disable react/prefer-stateless-function*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import DocumentForm from './document/DocumentForm.jsx';
import AllDocument from './document/AllDocument.jsx';
import
{ getDocument, deleteDocument, updateDocument, searchDocument, usersDocument }
from '../actions/documentActions';

/**
 *
 * React component for
 * @class DashBoardPage
 * @extends {React.Component}
 */
class DashBoardPage extends React.Component {
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

  componentDidMount() {
    if(this.props.user.userId)
      this.props.usersDocument(0, this.props.user.userId);
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
    this.props.usersDocument(offset, this.props.user.userId);
  }
 
   /**
   *
   * onChange
   * @param {object} e - event handler belonging to Onchange
   * @memberOf DashBoard
   */
  onChange(e) {
    const searchTerm = e.target.value;
    if (searchTerm < 1) {
      this.props.usersDocument(0, this.props.user.userId);
    }
    else {
      this.props.searchDocument(searchTerm);
    }
  }

  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf DashBoardPage
   */
  render() {
    const { documents, pagination } = this.props;
    let allDocuments;
      return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 l8"><h2 className="h2">My Documents</h2></div>
          <div className="document-button col s12 m6 l4 "><DocumentForm /></div>
        </div>
        <div className="row">
        <form className="col s12 m12 form-wrapper2 form-input">
          <input
            id="userDocSearch"
            className="col s12 search"
            type="search" placeholder="Search for document here..."
            onChange={this.onChange} name="search"
            required
          />
        </form>
        </div>
        { documents.length > 0
        ?
        <div>
          <div className="row">
            { documents.map((doc, index) => <AllDocument
              key={index}
              document={doc}
              deleteDocument={this.props.deleteDocument}
            />)}
        </div>
            <Pagination
              className="center"
              items={pagination.page_count}
              activePage={pagination.page}
              maxButtons={pagination.page_count}
              onSelect={e => this.onSelect(e)}
            />
        </div>
       : <div className="center noresult">No document found</div>
        } </div>
    );
    }
  }
const mapStateToProps = state => ({
  documents: state.documents.documents,
  pagination: state.documents.pagination,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  usersDocument: bindActionCreators(usersDocument, dispatch),
  getDocument: bindActionCreators(getDocument, dispatch),
  deleteDocument: bindActionCreators(deleteDocument, dispatch),
  updateDocument: bindActionCreators(updateDocument, dispatch),
  searchDocument: bindActionCreators(searchDocument, dispatch),
});

DashBoardPage.propTypes = {
  deleteDocument: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
