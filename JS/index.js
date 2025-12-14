document.addEventListener('DOMContentLoaded', () => {
    const recruitmentList = document.getElementById('recruitment-list');
    const eventList = document.getElementById('event-list');

    // 메인 화면에 띄울 모집 공고 데이터 (12월 모집)
    const recruitments = [
        {
            title: "[모집] 2025년 12월 GX 프로그램 수강생 모집",
            description: "12월 한 달간 진행되는 요가, 필라테스, 줌바 댄스 수강생을 모집합니다. 선착순 마감되오니 서둘러 신청해주세요.",
            period: "2025.11.25 ~ 2025.11.30",
            link: "notice.html?id=6" // 클릭 시 공지사항 게시판으로 이동
        }
    ];

    if (recruitmentList) {
        const today = new Date();

        recruitments.forEach(item => {
            // 기간 파싱 및 종료 여부 확인
            let isClosed = false;
            const periodParts = item.period.split('~');
            if (periodParts.length === 2) {
                const endDateStr = periodParts[1].trim().replace(/\./g, '-'); // 2025.11.30 -> 2025-11-30
                const endDate = new Date(endDateStr);
                endDate.setHours(23, 59, 59, 999); // 해당일의 마지막 시간까지 유효

                if (today > endDate) isClosed = true;
            }

            const div = document.createElement('div');
            div.className = `recruitment-item ${isClosed ? 'closed' : ''}`;
            
            div.innerHTML = `
                <a href="${item.link}">
                    <span class="badge ${isClosed ? 'closed' : ''}">${isClosed ? '모집종료' : '모집중'}</span>
                    <h4>${item.title}</h4>
                    <p class="desc">${item.description}</p>
                    <p class="period">기간: ${item.period}</p>
                </a>
            `;
            recruitmentList.appendChild(div);
        });
    }

    // 메인 화면에 띄울 이벤트 데이터
    const events = [
        {
            title: "크리스마스 특별 할인 이벤트",
            description: "12월 등록 회원님께 드리는 특별한 혜택! 클릭해서 할인코드를 확인하세요.",
            period: "2025.12.01 ~ 2025.12.25"
        }
    ];

    if (eventList) {
        events.forEach(item => {
            const div = document.createElement('div');
            div.className = 'event-item';
            div.innerHTML = `
                <span class="badge event-badge">EVENT</span>
                <h4>${item.title}</h4>
                <p class="desc">${item.description}</p>
                <p class="period">기간: ${item.period}</p>
            `;
            
            div.addEventListener('click', () => {
                alert("할인코드: X-mas");
                window.location.href = "payment.html";
            });
            
            eventList.appendChild(div);
        });
    }
});