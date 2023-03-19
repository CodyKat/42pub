import React from 'react';

function Popup() {
  return (
    <div>
      <div className="overlay" id="overlay"></div>
      <div className="popup" id="popup">
        <p id="popupText"></p>
        <button id="closePopup">확인</button>
      </div>
    </div>
  );
}

export default Popup;
