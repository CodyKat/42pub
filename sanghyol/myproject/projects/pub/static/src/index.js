import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import IsLogin from './login';
//import BackgroundAnimation from './BackgroundAnimation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <IsLogin/>
      {/*<BackgroundAnimation />*/}
      <App />
  </React.StrictMode>
);


reportWebVitals();
