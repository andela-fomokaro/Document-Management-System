/* eslint-disable no-undef*/
/* eslint-disable no-unused-vars*/
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ThemeDefault from '../../theme-default';
import { login } from '../../actions/loginActions';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import validateInput from '../../../shared/validate/login';


/**
 * React component for
 *
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {

  /**
   * Creates an instance of LoginForm
   *
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: []
    };
    const userData = this.state;
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * onSubmit - This method creates a user
   *
   * @param {object} e
   * @returns {void}
   *
   * @memberOf LoginForm
   */
  onSubmit(e) {
    e.preventDefault();
    const { isValid } = validateInput(this.state);
    if (isValid) {
      const email = this.state.identifier;
      const { password } = this.state;
      this.props.login({ email, password }).then(
        () => {
          document.location.href = '/';
          Materialize.toast('Login successful', 3000);
        },
    ).catch((err) => {
      Materialize.toast(err.data.message, 2000);
    }
    );
    }
  }

  /**
   * onChange - This method logs a user inside the application
   *
   * @param {object} event
   *
   * @return {void}
   *
   * @memberOf LoginForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @returns {object} react component to render
   *
   * @memberOf LoginForm
   */
  render() {
    const { identifier } = this.state;

    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 600,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: '0',
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
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>
              <form onSubmit={this.onSubmit}>
              <div className="row">
                <i className="material-icons">email</i>
                <TextFieldGroup
                  field="identifier"
                  label="Email"
                  value={identifier}
                  onChange={this.onChange}
                  type="email"
                  required
                />
                </div>
                <div className="row">
                 <i className="material-icons">lock_open</i>
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
                <button className="btn grey lighten-5 black-text">Login</button>
                <p><Link to="/signup">Dont have an account ? Signup</Link></p>
              </form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>

    );
  }
}
LoginForm.propTypes = {
  login: propTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: propTypes.object.isRequired
};


export default connect(null, { login })(LoginForm);
