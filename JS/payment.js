document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('month-select');
    const couponInput = document.getElementById('coupon-code');
    const btnApplyCoupon = document.getElementById('btn-apply-coupon');
    const btnPay = document.getElementById('btn-pay');
    const couponMessage = document.getElementById('coupon-message');

    const elBasePrice = document.getElementById('base-price');
    const elPeriodDiscount = document.getElementById('period-discount');
    const elCouponDiscount = document.getElementById('coupon-discount');
    const elFinalPrice = document.getElementById('final-price');

    let isCouponApplied = false;
    const COUPON_CODE = "X-mas"; // 20% 할인 쿠폰 코드

    // 1~12개월 옵션 생성
    if (monthSelect) {
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i}개월`;
            monthSelect.appendChild(option);
        }
        monthSelect.addEventListener('change', calculatePrice);
    }

    // 쿠폰 적용 버튼 이벤트
    if (btnApplyCoupon) {
        btnApplyCoupon.addEventListener('click', () => {
            const code = couponInput.value.trim();
            if (code === COUPON_CODE) {
                if (!isCouponApplied) {
                    isCouponApplied = true;
                    couponMessage.textContent = "20% 할인이 적용되었습니다.";
                    couponMessage.className = "message success";
                    calculatePrice();
                } else {
                    alert("이미 쿠폰이 적용되었습니다.");
                }
            } else {
                isCouponApplied = false;
                couponMessage.textContent = "유효하지 않은 쿠폰입니다.";
                couponMessage.className = "message error";
                calculatePrice();
            }
        });
    }

    function calculatePrice() {
        const months = parseInt(monthSelect.value) || 0;
        
        // 1. 기본 가격: 1개월 = 10,000원
        const basePrice = months * 10000;

        // 2. 기간 할인: 3개월마다 1,000원 할인
        const periodDiscount = Math.floor(months / 3) * 1000;

        // 기간 할인이 적용된 중간 금액
        let currentPrice = basePrice - periodDiscount;

        // 3. 쿠폰 할인: 20% (기간 할인이 적용된 금액 기준)
        let couponDiscount = 0;
        if (isCouponApplied) {
            couponDiscount = currentPrice * 0.2;
        }

        // 최종 금액
        const finalPrice = currentPrice - couponDiscount;

        // 화면 업데이트
        elBasePrice.textContent = basePrice.toLocaleString() + '원';
        elPeriodDiscount.textContent = '-' + periodDiscount.toLocaleString() + '원';
        elCouponDiscount.textContent = '-' + couponDiscount.toLocaleString() + '원';
        elFinalPrice.textContent = finalPrice.toLocaleString() + '원';
    }

    // 결제 버튼 클릭 시 유효성 검사
    if (btnPay) {
        btnPay.addEventListener('click', () => {
            const months = parseInt(monthSelect.value);
            const paymentMethod = document.querySelector('input[name="method"]:checked');

            if (!months) {
                alert("개월 수를 선택해주세요.");
                monthSelect.focus();
                return;
            }

            if (!paymentMethod) {
                alert("결제 방법을 선택해주세요.");
                return;
            }

            // 결제 성공 시 데이터 업데이트
            updateUserData(months);

            const finalPrice = elFinalPrice.textContent;
            alert(`${months}개월 수강권 (${finalPrice}) 결제가 완료되었습니다.`);
            window.location.href = 'mypage.html'; // 결과 확인을 위해 마이페이지로 이동
        });
    }
});

function updateUserData(monthsToAdd) {
    let userData = JSON.parse(localStorage.getItem('gym_user_data'));

    // 데이터가 없으면 기본값 생성
    if (!userData) {
        userData = {
            name: "김상명",
            expiresAt: null,
            locker: { status: -1, password: "" }
        };
    }

    const today = new Date();
    let newExpireDate;

    if (userData.expiresAt) {
        const currentExpire = new Date(userData.expiresAt);
        // 만료일이 지났으면 오늘부터 시작, 아니면 기존 만료일부터 연장
        if (currentExpire < today) {
            newExpireDate = new Date(today);
        } else {
            newExpireDate = new Date(currentExpire);
        }
    } else {
        // 처음 등록
        newExpireDate = new Date(today);
    }

    // 개월 수 추가
    newExpireDate.setMonth(newExpireDate.getMonth() + monthsToAdd);
    
    // YYYY-MM-DD 형식으로 저장
    const year = newExpireDate.getFullYear();
    const month = String(newExpireDate.getMonth() + 1).padStart(2, '0');
    const day = String(newExpireDate.getDate()).padStart(2, '0');
    userData.expiresAt = `${year}-${month}-${day}`;

    localStorage.setItem('gym_user_data', JSON.stringify(userData));
}