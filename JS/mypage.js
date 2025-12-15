document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('gym_user_data');
    // // 디버그용 초기화

    // localStorage에서 사용자 데이터 가져오기
    let userData = JSON.parse(localStorage.getItem('gym_user_data'));

    // 데이터가 없으면 초기 상태(미등록)로 생성
    if (!userData) {
        userData = {
            name: "김상명",
            expiresAt: null, // 초기에는 등록 일수 없음
            locker: {
                status: -1, // 미등록
                password: ""
            }
        };
        // 초기 상태 저장
        localStorage.setItem('gym_user_data', JSON.stringify(userData));
    }

    renderUserInfo(userData);
});

function renderUserInfo(user) {
    const greetingElement = document.querySelector('.user-info p');
    const statusGrid = document.querySelector('.status-grid');

    if (greetingElement) {
        greetingElement.textContent = `${user.name} 회원님 안녕하세요.`;
    }

    if (statusGrid) {
        let daysText = "등록된 이용권이 없습니다.";
        let expireDateText = "-";

        // 변수 사용 (expiresAt)
        const expiresAt = user.expiresAt;

        if (expiresAt) {
            // 남은 일수 계산
            const today = new Date();
            const expireDate = new Date(expiresAt);
            // 시간 차이를 일 단위로 변환
            const timeDiff = expireDate.setHours(0,0,0,0) - today.setHours(0,0,0,0);
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysLeft > 0) {
                daysText = `${daysLeft}일 남았습니다.`;
                expireDateText = expiresAt;
            } else if (daysLeft === 0) {
                daysText = "오늘 만료됩니다.";
                expireDateText = expiresAt;
            } else {
                daysText = "만료되었습니다.";
                expireDateText = expiresAt;
            }
        }

        // 사물함 정보 처리
        let lockerContent = "";
        if (user.locker.status !== -1) {
            lockerContent = `<p class="locker-pw">비밀번호: <strong>${user.locker.password}</strong></p>`;
        } else {
            lockerContent = `<button class="btn-register-locker">사물함을 등록하세요</button>`;
        }

        statusGrid.innerHTML = `
            <div class="info-card">
                <h4>등록 현황</h4>
                <p class="days-left">${daysText}</p>
                <p class="expire-date">만료일: ${expireDateText}</p>
            </div>
            <div class="info-card">
                <h4>사물함</h4>
                ${lockerContent}
            </div>
        `;

        // 사물함 등록 버튼 이벤트 연결
        const btnRegister = statusGrid.querySelector('.btn-register-locker');
        if (btnRegister) {
            btnRegister.addEventListener('click', () => {
                const password = prompt("설정할 사물함 비밀번호 4자리를 입력하세요.");
                if (password !== null) {
                    if (/^\d{4}$/.test(password)) {
                        // 데이터 업데이트
                        user.locker.status = 1;
                        user.locker.password = password;
                        localStorage.setItem('gym_user_data', JSON.stringify(user));
                        
                        alert("사물함이 등록되었습니다.");
                        renderUserInfo(user); // 화면 갱신
                    } else {
                        alert("비밀번호는 숫자 4자리로 입력해주세요.");
                    }
                }
            });
        }
    }
}