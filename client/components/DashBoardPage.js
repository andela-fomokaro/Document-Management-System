/* eslint-disable react/prefer-stateless-function*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import SideNavLink from './SideNav';
import { loadDocuments, getDocument, deleteDocument } from '../actions/documentActions';
import DashBoardOnboarding from '../components/document/DashboardOnboarding';

/**
 *
 * React component for
 * @class DashBoardPage
 * @extends {React.Component}
 */
class DashBoardPage extends React.Component {
  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf DashBoardPage
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

DashBoardPage.propTypes = {
  deleteDocument: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
