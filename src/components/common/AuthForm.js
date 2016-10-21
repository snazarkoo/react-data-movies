import React, { PropTypes } from 'react';

const Login = ({onLoginClick, onSignUpClick, errorMessage, onChange}) => {
  return (
    <form>
      <input type="text" name="username"
        className="form-control"
        placeholder="Username"
        pattern="[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]"
        onChange={onChange}
        required />
      <input type="password" name="password"
        className="form-control"
        placeholder="Username"
        onChange={onChange} 
        required />
      <input
        type="button"
        onClick={onLoginClick}
        className="btn btn-primary"
        value="Login" />
      <input
        type="button"
        onClick={onSignUpClick}
        className="btn btn-primary"
        value="Sign Up" />
      {errorMessage &&
        <p style={{color:"red"}}>{errorMessage}</p>
      }
    </form>
  );
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func
};

export default Login;