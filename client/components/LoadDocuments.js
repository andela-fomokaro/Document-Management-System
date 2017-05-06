import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import SingleDocument from './document/SingleDocument';
import { loadDocuments, getDocument, deleteDocument, updateDocument } from '../actions/documentActions';
import Footer from './Footer';

class DashBoard extends React.Component {

  componentWillMount() {
    this.props.loadDocuments();
  }

  render() {
    console.log(this.props);
    const { document } = this.props.doc;
    return (
      <div>
        <div className="container">
           <Link to="/dashboardpage">Return to Home Page</Link>
          <div className="row">
            { document.map(doc => <SingleDocument
              key={doc.id}
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
