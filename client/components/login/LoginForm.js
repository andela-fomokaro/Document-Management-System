import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { grey500, white } from 'material-ui/styles/colors';
import ThemeDefault from '../../theme-default';
import { login } from '../../actions/loginActions';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../shared/validate/login';


class LoginForm extends React.Component {
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

  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    console.log(errors, isValid);
    if (isValid) {
      const email = this.state.identifier;
      const { password } = this.state;
      this.props.login({ email, password }).then(
        (user) => {
          console.log(this.state);
          console.log(user);
          this.context.router.push('/');
        },
        (err) => {
          console.log(err);
        }
    );
    } else {
      this.setState({ errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { password, identifier, errors } = this.state;

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
