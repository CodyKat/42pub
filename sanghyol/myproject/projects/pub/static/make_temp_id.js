templogin.addEventListener('click', (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막습니다.
	fetchUsername();

	async function fetchUsername() {
		try {
		  const response = await fetch('http://127.0.0.1:5000/api/get_random_username', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: 'John' })
		  });

		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }

		  const data = await response.json();
		  console.log(data.username); // 'Hello, John!'
		} catch (error) {
		  console.error('Error:', error);
		}
	  }

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
