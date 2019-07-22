import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/**
 * anonymous function - Checks whether a user has access to a route or not
 *
 * @param  {function} ComponentRequiresAuth
 * @return {void}
 */
export default function (ComponentRequiresAuth) {
  /**
   *
   */
  class RequiresAuthentication extends React.Component {

    /**
     * componentWillMount
     *
     * @return {void}
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        browserHistory.push('/');
        Materialize.toast('You need to be signed in to view this page.', 4000);
      }
    }

    /**
     * render - renders the component ComponentRequiresAuth
     *
     * @return {void} null
     */
    render() {
      return (
        <ComponentRequiresAuth {...this.props} />
      );
    }
  }

  RequiresAuthentication.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
  };


 /**
 * This method map state to props
 *
 * @param {object} state
 * @returns {function} dispatch
 */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.login.isAuthenticated,
    };
  }

  return connect(mapStateToProps, {})(RequiresAuthentication);
}
