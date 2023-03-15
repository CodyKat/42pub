import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [rotateDeg, setRotateDeg] = useState(0);

  const spinWheel = () => {
    const randomDeg = Math.floor(Math.random() * 360) + 1800;
    setRotateDeg(randomDeg);
  };

  return (
    <div className="App">
      <div className="roulette-container">
        <div
          className="roulette-wheel"
          style={{ transform: `rotate(${rotateDeg}deg)` }}
        ></div>
        <div className="indicator"></div>
      </div>
      <button onClick={spinWheel} className="spin-button">
        회전
      </button>
    </div>
  );
};

export default App;
