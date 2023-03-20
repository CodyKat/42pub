// IsLogin.js
//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import './login.css';
//import BackgroundAnimation from './BackgroundAnimation'; // BackgroundAnimation 컴포넌트를 import하세요.

//const IsLogin = () => {
//  const [isLoggedIn, setIsLoggedIn] = useState(null);

//  useEffect(() => {
//    const checkLoginStatus = async () => {
//      try {
//        const response = await axios.post('http://127.0.0.1:5000/api/is_login', {}, {
//          withCredentials: true,
//        });

//        if (response.status === 200) {
//          console.log('로그인 세션 쿠키가 정상입니다.');
//          setIsLoggedIn(true);
//        } else {
//          console.log('로그인 세션 쿠키가 비정상입니다.');
//          setIsLoggedIn(false);
//        }
//      } catch (error) {
//        console.log('로그인 세션 쿠키가 없거나, 요청에 실패했습니다.');
//        setIsLoggedIn(false);
//      }
//    };

//    checkLoginStatus();
//  }, []);

//  if (isLoggedIn === null) {
//    return null; // 로그인 상태 확인 중입니다.
//  } else if (isLoggedIn) {
//    return <BackgroundAnimation />; // 로그인 성공 시 BackgroundAnimation을 보여줍니다.
//  } else {
//    window.location.href = "/loginpage.html"; // 로그인 실패 시 loginpage.html로 리다이렉트합니다.
//    return null;
//  }
//};

//export default IsLogin;
//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import './login.css';
//import BackgroundAnimation from './BackgroundAnimation';
//import LoginForm from './LoginForm'; // LoginForm 컴포넌트를 import하세요.

//const IsLogin = () => {
//  const [isLoggedIn, setIsLoggedIn] = useState(null);

//  useEffect(() => {
//    const checkLoginStatus = async () => {
//      try {
//        const response = await axios.post('http://127.0.0.1:5000/api/is_login', {}, {
//          withCredentials: true,
//        });

//        if (response.status === 200) {
//          console.log('로그인 세션 쿠키가 정상입니다.');
//          setIsLoggedIn(true);
//        } else {
//          console.log('로그인 세션 쿠키가 비정상입니다.');
//          setIsLoggedIn(false);
//        }
//      } catch (error) {
//        console.log('로그인 세션 쿠키가 없거나, 요청에 실패했습니다.');
//        setIsLoggedIn(false);
//      }
//    };

//    checkLoginStatus();
//  }, []);

//  if (isLoggedIn === null) {
//    return <div>Loading...</div>;
//  }

//  return isLoggedIn ? <BackgroundAnimation /> : <LoginForm />;
//};

//export default IsLogin;
