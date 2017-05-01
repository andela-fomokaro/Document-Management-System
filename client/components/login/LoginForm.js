import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/login';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../shared/validate/login';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (isValid) {
      this.props.login(this.state).then(
        (user) => {
          console.log(user.data);
        },
        (err) => {
          console.log(err);
        },
        (res) => {
          this.context.router.push('/');
        }
    );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { password, identifier } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Login</h3>

        <TextFieldGroup
          field="identifier"
          label="Username or  Email"
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
