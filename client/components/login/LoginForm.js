import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
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

    return (
      <form onSubmit={this.onSubmit}>
        <h3>Login</h3>
        <p>{ errors}</p>

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

        <button className="btn  blue darken-4">Login</button>

      </form>
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
