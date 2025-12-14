document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = document.getElementById('user-id').value;
            const userPw = document.getElementById('user-pw').value;

            // 미리 등록된 회원 정보 (이름: 김상명, 비밀번호: 1234)
            if (userId === '김상명' && userPw === '1234') {
                alert(`${userId}님 환영합니다!`);
                window.location.href = 'mypage.html';
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.\n(관계자만 보이는(><) 등록된 정보 - ID: 김상명, 비밀번호: 1234)');
            }
        });
    }
});