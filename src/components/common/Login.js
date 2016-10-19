import React, { PropTypes } from 'react';

const Login = ({onLoginClick, errorMessage, onChange}) => {
  return (
    <form>
      <input type="text" name="username"
        className="form-control"
        placeholder="Username"
        onChange={onChange} />
      <input type="text" name="password"
        className="form-control"
        placeholder="Username"
        onChange={onChange} />
      <input
        type="submit"
        onClick={onLoginClick}
        className="btn btn-primary"
        value="Login" />
      {errorMessage &&
        <p style={{color:"red"}}>{errorMessage}</p>
      }
    </form>
  );
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func
};

export default Login;