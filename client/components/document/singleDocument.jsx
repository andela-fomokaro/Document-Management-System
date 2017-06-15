/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getSingleDocument } from '../../actions/documentActions';


/**
 * React component for
 *
 * @class singleDocument
 * @extends {React.Component}
 */
export class singleDocument extends React.Component {

  /**
   * componentDidMount - This method mounts the single document function
   *
   * @return {void}
   * @memberOf singleDocument
   */
  componentDidMount() {
    const id = this.props.params.id;
    this.props.getSingleDocument(id);
  }

  /**
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
/**
 * This method map dispatches to props
 * 
 * @returns {function} dispatch
 */
const mapDispatchToProps = dispatch => ({
  getSingleDocument: bindActionCreators(getSingleDocument, dispatch)
});

/**
 * This method map state to props
 * 
 * @returns {function} dispatch
 */
const mapStateToProps = state => ({
  doc: state.documents,
});

export default connect(mapStateToProps, mapDispatchToProps)(singleDocument);
