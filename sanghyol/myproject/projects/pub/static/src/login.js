import React, { useEffect } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import TempLogin from './TempLogin';
import './login.css';

const IsLogin = () => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/is_login', {
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log('로그인 세션 쿠키가 정상입니다.');
        } else {
          console.log('로그인 세션 쿠키가 비정상입니다.');
        }
      } catch (error) {
        console.log('로그인 세션 쿠키가 없거나, 요청에 실패했습니다.');
      }
    };

    checkLoginStatus();
  }, []);

  return null;
};

export default IsLogin;
