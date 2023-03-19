import React from 'react';
import './login.css';

function LoginForm() {
  return (
    <form id="loginform">
      <input type="text" id="username" placeholder="ID" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
