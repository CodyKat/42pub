const newUserId = await fetch('http://127.0.0.1:5000/api/get_random_username', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John' })
})
.then(response => response.json())
.then(data => console.log(data.message)) // 'Hello, John!'
.catch(error => console.error(error));

// API로 임시 아이디를 발급받아야 합니다.

const tempID = 'tempID'; // API를 통해 임시 아이디를 발급받아야 합니다.

document.getElementById('makeTempID').addEventListener('click', function() {
	event.preventDefault();
	document.getElementById('popupText').textContent = "Your temp ID is : " + tempID;
	document.getElementById('popup').style.display = 'block';
	document.getElementById('overlay').style.display = 'block';

});

document.getElementById('closePopup').addEventListener('click', function() {
	document.getElementById('popup').style.display = 'none';
	document.getElementById('overlay').style.display = 'none';
});
