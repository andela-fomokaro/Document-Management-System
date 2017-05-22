import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';


/**
 * 
 * 
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf SignupPage
   */
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4">
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: propTypes.func.isRequired,
  addFlashMessage: propTypes.func.isRequired
};


export default connect(null, { userSignupRequest })(SignupPage);
