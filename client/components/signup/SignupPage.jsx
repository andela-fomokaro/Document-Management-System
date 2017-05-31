/* eslint-disable no-shadow*/
/* eslint-disable react/prefer-stateless-function*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm.jsx';
import { userSignupRequest } from '../../actions/signupActions';


/**
 *
 * React component for
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {

  /**
   *
   *
   * @returns {object} react components to render
   *
   * @memberOf SignupPage
   */
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-4">
        <h1 className="access">SignUp Page</h1>
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};


export default connect(null, { userSignupRequest })(SignupPage);
