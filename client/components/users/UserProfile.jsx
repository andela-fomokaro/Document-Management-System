/* eslint-disable no-undef*/
import React from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { getSingleUser, updateUser } from '../../actions/usersAction';
import { getCurrentUser } from '../../utils/helpers';



/**
 *
 * React component for
 * @class UserProfile
 * @extends {React.Component}
 */
class UserProfile extends React.Component {

  /**
   * Creates an instance of UserProfile.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf UserProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      users: {
        username: '',
        fullNames: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    };
    this.onChange = this.onChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }


  /**
   *
   * componentDidMount
   * @returns {void}
   * @memberOf UserProfile
   */
  componentDidMount() {
    this.props.getSingleUser(getCurrentUser().userId);
  }

  /**
   *
   * componentWillReceiveProps
   * @param {object} nextProps
   * @returns {void}
   * @memberOf UserProfile
   */
  componentWillReceiveProps(nextProps) {
    const { email, username, fullNames, id } = nextProps.userInfo;
    this.setState({ email, username, fullNames });
  }


   /**
   *
   onChange
   * @param {object} e - event handler belonging to Onchange
   * @returns {void}
   * @memberOf UserProfile
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  /**
   * updateUser
   * @returns {void}
   * @memberOf UserProfile
   */
  updateUser() {
    if(this.state.password === this.state.passwordConfirmation){
       this.props.updateUser(this.state, getCurrentUser().userId)
       Materialize.toast('Update Successful', 3000);
       this.setState({
               password: '',
               passwordConfirmation: '',
          });
    } else {
      Materialize.toast('Update failed password must match', 3000);
    }
  }

  /**
   @returns {object} react componenents to render
   *
   * @memberOf UserProfile
   */
  render() {
    const userInfo = this.props.userInfo;
    const date = moment(userInfo.createdAt).format('MMMM Do YYYY, h:mm:ss a');
     const updateDate = moment(userInfo.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
           <h2 id="profileheader"className="h2">My Profile</h2>
            <div className="col s12 m12 l8 z-depth-5 card cardWidth darken-1">
              <div className="card-content black-text">
                <ul className="profileTitle">
                  <li className="listPadding">Full Name: {userInfo.fullNames}</li>
                  <li className="listPadding">Username: {userInfo.username}</li>
                  <li className="listPadding">Email: {userInfo.email}</li>
                  <li className="listPadding">Time Created: {date
}</li>
                  <li className="listPadding">Last Updated: {updateDate
}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="col s12 m6"
          header='Update Profile'
          id="profileUpdate"
          trigger={
            <button className=" col s12 m12 l2 btn profileButton pink darken-4 tooltipped"
            data-position="top" data-delay="10" data-tooltip="Click to update your profile"
            >Update profile</button>
  }
        >
         <label className="red-text">Username</label>
          <div className="col s12">
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                name="username"
                value={this.state.username}
                onChange={e => this.onChange(e)}
                placeholder="username"
              />
            </div>
            <label className="red-text">Email</label>
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                name="email"
                value={this.state.email}
                onChange={e => this.onChange(e)}
                placeholder="Email"
              />
            </div>
            <label className="red-text">Full Name</label>
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                name="fullNames"
                value={this.state.fullNames}
                onChange={e => this.onChange(e)}
                placeholder="Full Name"
              />
            </div>
            <label className="red-text">Password</label>
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
          <label className="red-text">Password Confirmation</label>
          <div className="row">
            <input
              onChange={this.onChange}
              value={this.state.passwordConfirmation}
              name="passwordConfirmation"
              type="password"
              className="validate"
              placeholder="Verify Password"
              required
            />
          </div>
            <button id="updateprofilebutton"onClick={() => this.updateUser(getCurrentUser().userId)} className="btn pink darken-4 center">Update</button>
            <button
              className="btn btn2 pink darken-4 white-text modal-action modal-close"
            >Close</button>
          </div>

        </Modal>
      </div>
    );
  }
}

UserProfile.propTypes = {
  userInfo: PropTypes.any.isRequired,
  updateUser: PropTypes.func.isRequired,
  getSingleUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getSingleUser: bindActionCreators(getSingleUser, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch)
});


const mapStateToProps = state => ({
  userInfo: state.users.user
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
