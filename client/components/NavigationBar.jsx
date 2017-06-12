import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../actions/loginActions';
import { hasAdmin } from '../utils/helpers';
import { notAdmin } from '../utils/helpers';


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
      <div>
       <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
       <ul id="nav-mobile" className="right hide-on-med-and-down">
         <li id="my-documents">
          <Link className="right view tooltipped" to="/" data-position="bottom" data-delay="5" data-tooltip="View & Manage My Documents"><i className="material-icons">assignment</i></Link>
        </li>
        <li id="edit-profile">
          <Link activeClassName="active" className="right view tooltipped" to="/profile" data-position="bottom" data-delay="5" data-tooltip="View & Manage My Profile"><i className="material-icons">perm_identity</i></Link>
        </li>
         <li>
          {notAdmin() ? <Link activeClassName="active" className="right view tooltipped" to="/users" data-position="bottom" data-delay="5" data-tooltip="View Other Users Profile"><i className="material-icons">supervisor_account</i></Link>: ''}
        </li>
        <li id="load-documents">
          <Link activeClassName="active" className="right view tooltipped" to="/load-documents" data-position="bottom" data-delay="5" data-tooltip="All Documents"><i className="material-icons">library_books</i></Link>
        </li>
        {hasAdmin() ? <li id="manage-role"><Link activeClassName="active" className="right view tooltipped" data-position="bottom" data-delay="5" data-tooltip="Manage Roles" id="managerole" to="/manage-roles"><i className="material-icons">games</i></Link></li>: ''}
        {hasAdmin() ? <li id="manage-users"><Link activeClassName="active" className="right view tooltipped" data-delay="5" data-tooltip="Manage Users" id="manageusers" to="/manage-users"><i className="material-icons">supervisor_account</i></Link></li> : ''}
        <li>
          <Link className="right view" to="/" onClick={this.logout}>Logout</Link>
        </li>
      </ul>

      <ul className="side-nav" id="mobile-demo">
        <li id="edit-profile">
          <Link className="view tooltipped" to="/profile" data-position="bottom" data-delay="5" data-tooltip="My Profile"><i className="material-icons">perm_identity</i></Link>
        </li>
         <li>
          {notAdmin() ? <Link className="view tooltipped" to="/users" data-position="bottom" data-delay="5" data-tooltip="Users"><i className="material-icons">supervisor_account</i></Link>: ''}
        </li>
        <li id="load-documents">
          <Link className="view tooltipped" to="/load-documents" data-position="bottom" data-delay="5" data-tooltip="All Documents"><i className="material-icons">library_books</i></Link>
        </li>
        <li id="my-documents">
          <Link className="view tooltipped" to="/" data-position="bottom" data-delay="5" data-tooltip="View & Manage Documents"><i className="material-icons">assignment</i></Link>
        </li>
        {hasAdmin() ? <li id="manage-role"><Link className="view tooltipped" data-position="bottom" data-delay="5" data-tooltip="Manage Roles" id="managerole" to="/manage-roles"><i className="material-icons">games</i></Link></li>: ''}
        {hasAdmin() ? <li id="manage-users"><Link className="view tooltipped" data-delay="5" data-tooltip="Manage Users" id="manageusers" to="/manage-users"><i className="material-icons">supervisor_account</i></Link></li> : ''}
        <li>
          <Link className="view" to="/" onClick={this.logout}>Logout</Link>
        </li>
      </ul>
      </div>
    );

    const guestLinks = (
      <ul id="nav-mobile" className="right">
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
          <ul>
          { isAuthenticated ? userLinks : guestLinks }
         </ul>
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
