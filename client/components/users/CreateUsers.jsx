import React from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import validateInput from '../../../shared/validate/signUp';

/**
 *
 * React component for
 * @class CreateUsers
 * @extends {React.Component}
 */
class CreateUsers extends React.Component {

  /**
   * Creates an instance of CreateUsers.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf CreateUsers
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

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * onSubmit
   * @param {object} e
   * @returns {void}
   * @memberOf CreateUsers
   */
  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (errors.passwordConfirmation || errors.email) {
      Materialize.toast('Invalid Credentials Entered', 2000);
    }else {
      this.props.createUsers(this.state);
      Materialize.toast('User Created Successfully', 2000);
      this.setState({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      fullNames: ''
    });
    }
  }


  /**
   *
   * onChange
   * @param {object} e - event handler belonging to onChange
   * @returns {void}
   * @memberOf CreateUsers
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf CreateUsers
   */
  render() {
    return (
      <Modal
         header='Create New User'
        trigger={
          <a
           className="btn-floating btn-large docButton pink darken-3 tooltipped"
          data-position="right" data-delay="50" data-tooltip="Create New User"
          > <i className="material-icons">note_add</i></a>
  }
      >

        <form onSubmit={this.onSubmit}>
          <label className="red-text"><b>USERNAME</b></label>
          <TextFieldGroup
            label=""
            onChange={this.onChange}
            type="text"
            name="username"
            checkUserExists={this.checkUserExists}
            value={this.state.username}
            field="username"
            required
          />
          <label className="red-text"><b>FULL NAME</b></label>
          <TextFieldGroup
            label=""
            onChange={this.onChange}
            type="text"
            name="fullNames"
            checkUserExists={this.checkUserExists}
            value={this.state.value}
            field="fullNames"
            required
          />
          <label className="red-text"><b>EMAIL</b></label>
          <TextFieldGroup
            label=""
            onChange={this.onChange}
            type="email"
            name="email"
            checkUserExists={this.checkUserExists}
            value={this.state.email}
            field="email"
            required
          />
          <label className="red-text"><b>PASSWORD</b></label>
          <div className="row">
            <input
              onChange={this.onChange}
              value={this.state.password}
              name="password"
              type="password"
              className="validate"
              required
            />
          </div>
          <label className="red-text"><b>PASSWORD CONFIRMATION</b></label>
          <div className="row">
            <input
              onChange={this.onChange}
              value={this.state.passwordConfirmation}
              name="passwordConfirmation"
              type="password"
              className="validate"
              required
            />
          </div>
          <button
          id="adminCreateUser"className="btn btn2 pink darken-4 center">Send</button>
           <button
              className="btn btn2 pink darken-4 white-text modal-action modal-close"
              >Close</button>
        </form>
      </Modal>
    );
  }
}

CreateUsers.propTypes = {
  createUsers: propTypes.func.isRequired
};
export default CreateUsers;
