import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import SideNavLink from './SideNav';
import { loadDocuments, getDocument, deleteDocument } from '../actions/documentActions';
import DashBoardOnboarding from '../components/document/DashboardOnboarding';

/**
 * 
 * 
 * @class DashBoard
 * @extends {React.Component}
 */
class DashBoard extends React.Component {

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf DashBoard
   */
  render() {
    return (
      <div>
        <SideNavLink />
        <DashBoardOnboarding />
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
