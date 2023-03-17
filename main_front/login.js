// 로그인을 하면 다음 스크립트를 실행하는 코드

loginform.addEventListener('submit', (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    const username = document.getElementById('username').value;
    // const password = document.getElementById('password').value;
    console.log(`Username: ${username}`);

    // 사용자 이름 및 비밀번호를 처리하고 로그인 성공 여부를 결정합니다.
    // 예: 서버에서 로그인 정보를 확인하고 응답을 확인하는 AJAX 요청 등
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
});

function loadNextScript() {
	const script = document.createElement('script');
	script.src = 'mainpage.js';
	document.body.appendChild(script);
}
