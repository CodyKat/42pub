const templogin = document.getElementById('templogin');

templogin.addEventListener('click', async (event) => {
	event.preventDefault(); // 기본 폼 제출 동작을 막습니다.
	const tempID = await fetchUsername();
	alert("your IS is : " + tempID);
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
