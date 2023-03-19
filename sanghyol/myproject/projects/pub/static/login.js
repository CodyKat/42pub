window.addEventListener('load', function() {
const loginform = document.getElementById('loginform');
loginform.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    const username = document.getElementById('username').value;
    const wallet = document.getElementById('wallet').value;
    const eval_point = document.getElementById('eval_point').value;
    const money = document.getElementById('money').value;
    const level = document.getElementById('level').value;
    const exp = document.getElementById('exp').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username,
                                      'wallet': wallet,
                                        'eval_point': eval_point,
                                        'money': money,
                                        'level': level,
                                        'exp': exp })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        // 유저 정보를 가져왔을때
            localStorage.setItem('username', username);
            localStorage.setItem('token', data.token);
            loadNextScript();
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
