// 바로 로그인 하는 세션
    const username = document.getElementById('username').value;
    // const password = document.getElementById('password').value;
    console.log(`Username: ${username}`);
    const loginSuccess = true;

    if (loginSuccess) {
        // 로그인이 성공하면, 로그인 정보를 저장하고 다음 스크립트를 로드합니다.
        localStorage.setItem('username', username);
        // localStorage.setItem('password', password);
        loadNextScript();

		// 로그인 폼을 숨깁니다.
		loginform.remove();
        templogin.remove();
    } else {
        // 로그인이 실패하면, 에러 메시지를 표시하거나 사용자에게 알립니다.
        alert('Login failed. Please check your username and password.');
    }

function loadNextScript() {
	const script = document.createElement('script');
	script.src = 'mainpage.js';
	document.body.appendChild(script);
}
