import React, { PropTypes } from 'react';

const Login = ({onLoginClick, onSignUpClick, onChange}) => {
  return (
    <form>
      <input type="text" name="username"
        className="form-control"
        placeholder="Username"
        onChange={onChange}
        required />
      <input type="password" name="password"
        className="form-control"
        placeholder="Username"
        onChange={onChange} 
        required />
      <ul className="menu auth">
        <li onClick={onLoginClick} ><a>Login</a></li>
        <li>or</li>
        <li onClick={onSignUpClick}><a>Sign Up</a></li>
      </ul>
    </form>
  );
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
  onChange: PropTypes.func
};

export default Login;