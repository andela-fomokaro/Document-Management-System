import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../actions/loginActions';
import { hasAdmin } from '../utils/helpers';


/**
 *
 * React component for
 * @class NavigationBar
 * @extends {React.Component}
 */
class NavigationBar extends React.Component {

  /**
   * Creates an instance of NavigationBar.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf NavigationBar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   *
   * logout
   * @param {object} e - event handler belonging to logout
   * @returns {void}
   * @memberOf NavigationBar
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf NavigationBar
   */
  render() {
    const header = {
      margin: '20px',
      color: '#fff'
    };
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        
        <li id="edit-profile">
          <Link className="right view" to="/profile">Edit Profile</Link>
        </li>

        <li id="load-documents">
          <Link className="right view" to="/load-documents"> View All Documents </Link>
        </li>

        <li id="my-documents">
          <Link className="right view" to="/"> My Documents </Link>
        </li>
        
        {hasAdmin() ? <li id="manage-role"><Link className="right view" id="managerole" to="/manage-roles">Manage Roles</Link></li>: ''}

        {hasAdmin() ? <li id="manage-users"><Link className="right view" id="manageusers" to="/manage-users">Manage Users</Link></li> : ''}
        <li>
          <Link className="right view" to="/" onClick={this.logout}>Logout</Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link id="signup"to="/signup">Sign up</Link></li>
        <li><Link id="login"to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav>
        <div className="nav-wrapper pink darken-4">
          <h1>
            <Link to="/" className="brand-logo brand">DocStar</Link>
          </h1>
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.login
});

export default connect(mapStateToProps, { logout })(NavigationBar);
