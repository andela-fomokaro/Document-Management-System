/* eslint-disable no-undef*/
/* eslint-disable no-unused-vars*/
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { userSignupRequest } from '../../actions/signupActions';
import ThemeDefault from '../../theme-default';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import validateInput from '../../../shared/validate/signUp';


/**
 * React component for
 *
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {

  /**
   * Creates an instance of SignupForm.
   *
   * Constructor
   * @param {object} props
   *
   * @memberOf SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      fullNames: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * onChange
   *
   * @param {object} e - event handler for onChange
   * @returns {void}
   *
   * @memberOf SignupForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * onSubmit
   *
   * @param {object} e - event handler for onSubmit
   * @returns {void}
   *
   * @memberOf SignupForm
   */
  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (isValid) {
      this.props.userSignupRequest(this.state).then(
        (user) => {
          document.location.href = '/';
           Materialize.toast('Sign up successful', 3000);
        }
    )
    .catch((err) => {
      Materialize.toast(err.data.message, 2000);
    }
    );
    } else if (errors.passwordConfirmation || errors.email) {
      Materialize.toast(errors.passwordConfirmation, 2000);
    } else if (errors.password.length) {
      Materialize.toast(errors.password, 2000);
    }
    else {
      Materialize.toast('An error occured, try again later!', 2000);
    }
  }

  /**
   *
   *
   * @returns {object} react components to render
   *
   * @memberOf SignupForm
   */
  render() {
    const grey500 = '#ddd';
    const white = '#fff';
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 600,
        maxheigth: 500,
        position: 'relative',
        top: 10,
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>
              <form onSubmit={this.onSubmit}>
              <div>
               <i className="material-icons">assignment_ind</i>
                <TextFieldGroup
                  label="Username"
                  type="text"
                  onChange={this.onChange}
                  name="username"
                  checkUserExists={this.checkUserExists}
                  value={this.state.username}
                  field="username"
                  required
                />
                </div>
                <div>
                <i className="material-icons">mode_edit</i>
                <TextFieldGroup
                  label="Full Names"
                  onChange={this.onChange}
                  type="text"
                  name="fullNames"
                  checkUserExists={this.checkUserExists}
                  value={this.state.fullNames}
                  field="fullNames"
                  required
                />
                </div>
                <div>
                <i className="material-icons">email</i>
                <TextFieldGroup
                  label="Email"
                  type="email"
                  onChange={this.onChange}
                  checkUserExists={this.checkUserExists}
                  value={this.state.email}
                  field="email"
                  required
                />
                </div>
                <div className="row">
                 <i className="material-icons">lock</i>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="validate"
                    required
                  />
                </div>
                <div className="row">
                 <i className="material-icons">lock</i>
                  <input
                    onChange={this.onChange}
                    value={this.state.passwordConfirmation}
                    name="passwordConfirmation"
                    type="password"
                    className="validate"
                    placeholder="Password Confirmation"
                    required
                  />
                </div>
                <button className="btn grey lighten-5 black-text">Sign Up</button>
              </form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: propTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: propTypes.object.isRequired
};

export default connect(null, { userSignupRequest })(SignupForm);
