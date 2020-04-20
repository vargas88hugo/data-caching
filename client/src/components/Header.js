import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper grey darken-1">
          <Link to="/" className="left brand-logo" style={{ margin: '0 10px' }}>
            Logo
          </Link>
        </div>
      </nav>
    </Fragment>
  );

  const authLinks = (
    <ul>
      <Link to="/auth/google">Login with Google</Link>
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
};

export default Header;
