import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <nav>
    <div className="nav-wrapper  blue darken-4">
      <Link to="/" className="brand-logo">DMs</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="signup">Sign up</Link></li>
        <li><Link to="login">Login</Link></li>
      </ul>
    </div>
  </nav>
  );
};
