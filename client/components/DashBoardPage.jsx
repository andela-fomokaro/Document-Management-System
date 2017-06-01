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
    this.props.usersDocument(offset);
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
      this.props.usersDocument(0, this.props.user.userId);
    } else {
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
     if (documents.length === 0) {
      return (
        <div className="container">
          <h2 className="profileTitle">Welcome Create A Document</h2>
          <DocumentForm/>
        </div>
      );
    }
      return (
      <div> 
        <form className="form-wrapper2 cf">
          <input
            id="userDocSearch"
            className="search"
            type="search" placeholder="Search for document here..."
            onChange={this.onChange} name="search"
            required
          />
        </form>
         <DocumentForm/>
        { documents.length > 0
        ?
        <div className="container">
          <div className="row">
            { documents.map((doc, index) => <AllDocument
              key={index}
              document={doc}
              deleteDocument={this.props.deleteDocument}
            />)}
        </div>
            <Pagination
              items={pagination.page_count}
              activePage={pagination.page}
              maxButtons={pagination.page_count}
              onSelect={e => this.onSelect(e)}
            />
        </div>
       : ''
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
