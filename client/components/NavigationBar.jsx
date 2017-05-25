import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
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
   * @param {any} e - event handler belonging to logout
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
      <div>
        <a className="right view" onClick={this.logout}>Logout</a>
        <a className="right view" href="/loadDocuments">View All Documents</a>
        <a className="right view" href="/myprofile">View Profile</a>
        {hasAdmin() ? <a className="right view" id="managerole" href="/managerole">Manage Roles</a> : ''}
        {hasAdmin() ? <a className="right view" id="manageusers" href="/manageusers">Manage Users</a> : ''}
      </div>
    );

    const guestLinks = (
      <ul id="nav-mobile" className="right view">
        <li><Link id="signup"to="/signup">Sign up</Link></li>
        <li><Link id="login"to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav>
        <div className="nav-wrapper  blue-grey darken-4">
          <Link to="/" className="brand-logo brand">docStar</Link>
          <div className="nav-wrapper  blue-grey darken-4">
            <h1>
            <Link to="/" className="brand-logo brand hide-on-med-and-down">DocStar</Link></h1>
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: propTypes.object.isRequired,
  logout: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.login
});

export default connect(mapStateToProps, { logout })(NavigationBar);
