import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="wrap-404">
      <div className="logo">
          <p>OOPS! - Could not Find it</p>
          <img src="/404.png" />
          <div className="sub">
            <p>
              <Link to={'/'}>
                Back
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
