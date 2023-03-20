// LoginForm.js
import React, { useState } from 'react';
import './login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
  
        if (data.status) {
          localStorage.setItem('username', username);
          localStorage.setItem('token', data.token);
          window.location.href = '/'; // 로그인 성공 시 메인 페이지로 이동
        } else {
          alert('Login failed. Please check your username.');
        }
      } else {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
    } catch (error) {
      alert('Login failed. Please check your username and password.');
      console.error('Error:', error);
    }
  };
  

  const handleTempId = async (event) => {
    event.preventDefault();
    const tempID = await fetchUsername();
    alert('Your temporary ID is : ' + tempID);
  };

  const fetchUsername = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/get_random_username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: 'John' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.user_name);
      return data.user_name;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form id="templogin" onSubmit={handleTempId}>
        <button type="submit" id="makeTempID">
          입시 아이디 발급
        </button>
      </form>
      <form id="loginform" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="ID"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
