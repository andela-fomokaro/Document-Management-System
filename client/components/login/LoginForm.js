import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ThemeDefault from '../../theme-default';
import { login } from '../../actions/loginActions';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../shared/validate/login';


/**
 *
 *
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {

  /**
   * Creates an instance of LoginForm.
   * @param {any} props
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

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   *
   * @param {any} e
   *
   * @memberOf LoginForm
   */
  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (isValid) {
      const email = this.state.identifier;
      const { password } = this.state;
      this.props.login({ email, password }).then(
        () => {
          Materialize.toast('Login successfull', 4000);
          return this.context.router.push('/');
        },
        (err) => {
          Materialize.toast(err.data.message, 1000);
        }
    );
    } else {
      Materialize.toast(errors.identifier, 1000);
      this.setState({ errors });
    }
  }

  /**
   *
   *
   * @param {any} e
   *
   * @memberOf LoginForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns
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
