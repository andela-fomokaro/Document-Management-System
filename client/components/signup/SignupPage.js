import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';


class SignupPage extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: propTypes.func.isRequired
};


export default connect(null, { userSignupRequest })(SignupPage);