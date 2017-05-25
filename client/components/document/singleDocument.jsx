/* eslint-disable no-undef*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
    return (
      <div className="container">
        <div className="z-depth-5 card docCard1">
          <div className="card-content cardContent">
            <a href="/"> Click To View Your Document</a>
            <span className="card-title cardTitle">{doc.title}</span>
            <p>{doc.content}</p>
            <a href="/loaddocuments">Click To View All Document </a>
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
