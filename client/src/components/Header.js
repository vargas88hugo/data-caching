import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper grey darken-1">
          <Link className="left brand-logo" style={{ margin: '0 10px' }}>
            Logo
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
