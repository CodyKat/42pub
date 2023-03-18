window.addEventListener('load', function() {
const loginform = document.getElementById('loginform');
loginform.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    const username = document.getElementById('username').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        if (data.status == true){
        // 로그인이 성공하면, 로그인 정보를 저장하고 다음 스크립트를 로드합니다.
            localStorage.setItem('username', username);
            localStorage.setItem('token', data.token);
            loadNextScript();

        // 로그인 폼을 숨깁니다.
        loginform.remove();
        templogin.remove();
        }
        else {
            this.alert('failed');
        }
    } catch (error) {
        // 로그인이 실패하면, 에러 메시지를 표시하거나 사용자에게 알립니다.
        alert('Login failed. Please check your username and password.');
        console.error('Error:', error);
    }
});
});

function loadNextScript() {
    const script = document.createElement('script');
    script.src = 'static/mainpage.js';
    document.body.appendChild(script);
}