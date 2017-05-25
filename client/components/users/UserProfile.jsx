/* eslint-disable no-undef*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { getSingleUser, updateUser } from '../../actions/usersAction';


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
   * @param {any} props - props of the component
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
    this.props.getSingleUser();
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
   * @param {any} e - event handler belonging to Onchange
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
    this.props.updateUser(this.state);
    Materialize.toast('Update Successfull', 1000);
  }

  /**
   *
   *
   @returns {object} react componenents to render
   *
   *
   * @memberOf UserProfile
   */
  render() {
    const userInfo = this.props.userInfo;
    const date = moment(userInfo.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="z-depth-5 card  cardWidth darken-1">
              <div className="card-content black-text">
                <ul className="profileTitle">
                  <li className="listPadding">Full Name: {userInfo.fullNames}</li>
                  <li className="listPadding">Username: {userInfo.username}</li>
                  <li className="listPadding">Email: {userInfo.email}</li>
                  <li className="listPadding">Time Created: {date
}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Modal
          trigger={
            <button className="btn  profileButton pink darken-4 tooltipped"
            data-position="top" data-delay="10" data-tooltip="Click to update your profile"
            >Update profile</button>
  }
        >
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
            <button className=" btn pink darken-4" onClick={() => this.updateUser()}>Update</button>
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
  userInfo: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
