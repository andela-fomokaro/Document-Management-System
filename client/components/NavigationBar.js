import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../actions/loginActions';


class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const header = {
      margin: '20px',
      color: '#f50057'
    };
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <a className="right" onClick={this.logout.bind(this)} href="#">Logout</a>
    );

    const guestLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav>
        <div className="nav-wrapper  blue-grey darken-4">
          <Link to="/" className="brand-logo">docStar Document Mangement System</Link>
          <div className="nav-wrapper  blue-grey darken-4">
            <h1 className="brand-logo" style={header}>docStar Document Mangement System</h1>
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

function mapStateToProps(state) {
  return {
    auth: state.login
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
