const templogin = document.getElementById('templogin');

templogin.addEventListener('click', async (event) => {
	event.preventDefault(); // 기본 폼 제출 동작을 막습니다.
	const tempID = await fetchUsername();
	document.getElementById('popupText').textContent = "Your temp ID is : " + tempID;
	document.getElementById('popup').style.display = 'block';
	document.getElementById('overlay').style.display = 'block';
});

async function fetchUsername() {
	try {
		const response = await fetch('http://127.0.0.1:5000/api/get_random_username', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'user_name': 'John' })
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
}

document.getElementById('closePopup').addEventListener('click', function() {
	document.getElementById('popup').style.display = 'none';
	document.getElementById('overlay').style.display = 'none';
});
