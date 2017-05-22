import React from 'react';
import LoginForm from './LoginForm';


/**
 * 
 * 
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf LoginPage
   */
  render() {
    return (
      <div className="row">
        <div className="col s4">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
