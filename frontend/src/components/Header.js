import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Header = (props) => {
  console.log(props);

  const authLinks = (
    <ul>
      <Link to="http://localhost:5000/api/auth/google" className="right">
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

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
