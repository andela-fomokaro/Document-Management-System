import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import SideNavLink from './SideNav';
import DocumentForm from './document/DocumentForm';
import { loadDocuments, getDocument, deleteDocument, updateDocument } from '../actions/documentActions';

class DashBoard extends React.Component {
  render() {
    return (
      <div>
        <form className="form-wrapper2 cf">
          <input type="search" placeholder="Search for users here..." required />
          <button type="submit">Search</button>
        </form>
        <SideNavLink />
        <DocumentForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  doc: state.documents
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
