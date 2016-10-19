import React, {PropTypes} from 'react';

const Logout = ({onLogoutClick}) => {
    return (
      <button onClick={onLogoutClick} className="btn btn-primary">
        Logout
      </button>
    )
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}

export default Logout;