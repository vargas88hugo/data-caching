import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const authLinks = (
    <ul>
      <Link to="/auth/google" className="right">
        Login with Google
      </Link>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/blogs">My Blogs</Link>
      </li>
      <li>
        <Link to="/auth/logout">Logout</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper grey darken-1">
          <Link to="/" className="left brand-logo" style={{ margin: '0 10px' }}>
            Logo
          </Link>
          <Fragment>{authLinks}</Fragment>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
