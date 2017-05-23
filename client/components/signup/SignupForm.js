import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { userSignupRequest } from '../../actions/signupActions';
import ThemeDefault from '../../theme-default';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../shared/validate/signUp';


/**
 * 
 * 
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {

  /**
   * Creates an instance of SignupForm.
   * @param {any} props 
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
   * 
   * 
   * @param {any} e 
   * 
   * @memberOf SignupForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * 
   * @param {any} e 
   * 
   * @memberOf SignupForm
   */
  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (isValid) {
      this.props.userSignupRequest(this.state).then(
        (user) => {
          Materialize.toast('Signed up successfully', 4000);
          this.context.router.push('dashboardpage');
        }
    );
    } else if (errors.passwordConfirmation || errors.email) {
      Materialize.toast('Wrong password or email entered', 2000);
    }
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf SignupForm
   */
  render() {
    const grey500 = '#ddd';
    const white = '#fff';
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
      buttonsDiv: {
        textAlign: 'center',
        padding: 10
      },
      flatButton: {
        color: grey500
      },
      checkRemember: {
        style: {
          float: 'left',
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey500
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500
        }
      },
      loginBtn: {
        float: 'right'
      },
      btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: '#4f81e9'
      },
      btnGoogle: {
        background: '#e14441'
      },
      btnSpan: {
        marginLeft: 5
      },
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="Username"
                  onChange={this.onChange}
                  checkUserExists={this.checkUserExists}
                  value={this.state.username}
                  field="username"
                  required
                />

                <TextFieldGroup
                  label="Full Names"
                  onChange={this.onChange}
                  checkUserExists={this.checkUserExists}
                  value={this.state.fullNames}
                  field="fullNames"
                  required
                />

                <TextFieldGroup
                  label="Email"
                  onChange={this.onChange}
                  checkUserExists={this.checkUserExists}
                  value={this.state.email}
                  field="email"
                  required
                />

                <div className="row">
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
                <button className="btn  pink darken-4">Sign Up</button>
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
