/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getSingleDocument } from '../../actions/documentActions';


/**
 *
 * React component for
 * @class singleDocument
 * @extends {React.Component}
 */
class singleDocument extends React.Component {

  /**
   *
   * componentDidMount
   * @return {void}
   * @memberOf singleDocument
   */
  componentDidMount() {
    const id = this.props.params.id;
    this.props.getSingleDocument(id);
  }

  /**
   *
   *
   * @returns {object} react components to render
   *
   * @memberOf singleDocument
   */
  render() {
    const doc = this.props.doc;
     const dateCreated = moment(doc.createdAt)
    .format('MMMM Do YYYY, h:mm:ss a');
    const lastUpdated = moment(doc.updatedAt)
    .format('MMMM Do YYYY, h:mm:ss a');
    return (
      <div className="container">
        <div className="z-depth-5 card docCard1">
          <div className="card-content cardContent">
            <span className="card-title cardTitle">{doc.title}</span>
            <span dangerouslySetInnerHTML={{__html: doc.content}} />
          </div>
          <div className="card-action">
            <p className="documentDate">Access Type: {doc.access}</p>
            <p className="documentDate">Created On: {dateCreated}</p>
            <p className="documentDate">Last Updated: {lastUpdated}</p>
            </div>
        </div>
      </div>
    );
  }
}

singleDocument.propTypes = {
  getSingleDocument: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => ({
  getSingleDocument: bindActionCreators(getSingleDocument, dispatch)
});

const mapStateToProps = state => ({
  doc: state.documents,
});

export default connect(mapStateToProps, mapDispatchToProps)(singleDocument);
