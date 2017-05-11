import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import SideNavLink from './SideNav';
import DocumentForm from './document/DocumentForm';
import { loadDocuments, getDocument, deleteDocument, updateDocument } from '../actions/documentActions';
import Footer from './Footer';

class DashBoard extends React.Component {
  render() {
    console.log(this.props);
    const { document } = this.props.doc;
    return (
      <div>
        <input className="input" type="text" name="search" placeholder="Search........." />
        <SideNavLink />
        <DocumentForm />
        <Footer />
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
