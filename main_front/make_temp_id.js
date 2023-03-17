
// API로 임시 아이디를 발급받아야 합니다.

const tempID = 'tempID'; // API를 통해 임시 아이디를 발급받아야 합니다.

document.getElementById('makeTempID').addEventListener('click', function() {
	document.getElementById('popupText').textContent = "Your temp ID is : " + tempID;
	document.getElementById('popup').style.display = 'block';
	document.getElementById('overlay').style.display = 'block';

});

document.getElementById('closePopup').addEventListener('click', function() {
	document.getElementById('popup').style.display = 'none';
	document.getElementById('overlay').style.display = 'none';
});
