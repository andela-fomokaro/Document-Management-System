import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import SideNavLink from './SideNav';
import DocumentForm from './document/DocumentForm';
import { loadDocuments, getDocument, deleteDocument, updateDocument } from '../actions/documentActions';
import Footer from './Footer';
import Picture from './picture/doco.jpg';

class DashBoard extends React.Component {

  componentWillMount() {
    this.props.loadDocuments();
  }
   handleImageLoaded() {
    this.setState({ imageStatus: '' });
  }
  handleImageErrored() {
    this.setState({ imageStatus: 'failed to load' });
  }
  render() {
    console.log(this.props);
    const { document } = this.props.doc;
    return (
       <div>
        <div>
          <div className="row">
            <div className="col s4">
              <div className="card">
                <div className="card-image">
                  <img
                    src={Picture} height="300"
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                  />
                </div>
                <div className="card-content">
                  <h3>Instruction For Use</h3>
                </div>
              </div>
            </div>
          <div className="col s6">
        <form>
          <div className="input-field">
            <input id="search" type="search" required placeholder="......Search Here" />
            <i className="material-icons red-text">close</i>
          </div>
        </form>
        <SideNavLink />
        <DocumentForm />
        </div>
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
