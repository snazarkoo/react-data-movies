import React, {PropTypes} from 'react';

const Logout = ({onLogoutClick}) => {
    return (
      <ul className="menu">
        <li onClick={onLogoutClick} className="btn btn-primary">
          <a>Logout</a>
        </li>
      </ul>
    );
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
};

export default Logout;