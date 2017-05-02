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
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav>
        <div className="nav-wrapper  blue darken-4">
          <Link to="/" className="brand-logo">DMs</Link>
        </div>

        <div className="nav-wrapper blue darken-4">
          {isAuthenticated ? userLinks : guestLinks}
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
