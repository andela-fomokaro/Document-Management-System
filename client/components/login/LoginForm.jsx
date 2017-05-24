/* eslint-disable no-undef*/
/* eslint-disable no-unused-vars*/
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ThemeDefault from '../../theme-default';
import { login } from '../../actions/loginActions';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import validateInput from '../../../shared/validate/login';


/**
 *
 * React component for
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {

  /**
   * Creates an instance of LoginForm.
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
   *
   *
   * onSubmit
   * @param {any} e
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
          Materialize.toast('Login successful', 3000);
          return this.context.router.push('/');
        },
    ).catch((err) => {
      Materialize.toast(err.data.message, 2000);
    }
    );
    }
  }

  /**
   *
   * onChange
   *
   * @param {any} e
   *
   * @return {void}
   *
   * @memberOf LoginForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns {object} react component to render
   *
   * @memberOf LoginForm
   */
  render() {
    const { identifier } = this.state;

    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
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

                <TextFieldGroup
                  field="identifier"
                  label="Email"
                  value={identifier}
                  onChange={this.onChange}
                  type="email"
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
                <button className="btn  pink darken-3">Login</button>
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
