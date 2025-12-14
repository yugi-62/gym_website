document.addEventListener('DOMContentLoaded', () => {
    const noticeList = document.getElementById('notice-list');
    const noticeContainer = document.querySelector('.notice-container');
    
    // 학교 체육관 관련 공지사항 예시 데이터
    const notices = [
        { id: 6, title: "[모집] 2025년 12월 GX 프로그램 수강생 모집", date: "2025-11-25", views: 15, isImportant: true, content: "2025년 12월 GX 프로그램 수강생을 모집합니다.\n\n기간: 11월 25일 ~ 11월 30일\n종목: 요가, 필라테스, 줌바\n신청: 안내데스크 방문 접수" },
        { id: 5, title: "체육관 샤워실 온수 공급 중단 안내 (5/25)", date: "2025-05-20", views: 120, isImportant: true, content: "보일러 점검으로 인해 5월 25일 하루 동안 온수 공급이 중단됩니다.\n이용에 착오 없으시길 바랍니다." },
        { id: 4, title: "5월 공휴일 및 개교기념일 단축 운영 안내", date: "2025-05-01", views: 85, isImportant: false, content: "5월 공휴일 및 개교기념일 운영 시간 안내입니다.\n\n- 5/5(어린이날): 휴무\n- 5/17(개교기념일): 10:00 ~ 18:00 단축 운영" },
        { id: 3, title: "신규 운동기구(스미스머신) 입고 및 사용법 교육", date: "2025-04-15", views: 230, isImportant: false, content: "최신형 스미스머신이 입고되었습니다.\n안전한 사용을 위해 트레이너가 사용법 교육을 진행하니 많은 참여 바랍니다." },
        { id: 2, title: "개인 사물함 신청 기간 연장 안내", date: "2025-03-10", views: 150, isImportant: false, content: "개인 사물함 신청 기간을 3월 15일까지 연장합니다.\n아직 신청하지 못한 회원님들은 기간 내 신청해주시기 바랍니다." },
        { id: 1, title: "2025학년도 1학기 상명스포츠센터 이용 수칙", date: "2025-03-02", views: 450, isImportant: true, content: "쾌적한 운동 환경을 위해 실내 운동화 착용 필수입니다.\n사용한 기구는 제자리에 정리해주시기 바랍니다." }
    ];

    // URL 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id && noticeContainer) {
        // 상세 페이지 렌더링
        const notice = notices.find(n => n.id == id);
        if (notice) {
            // 기존 목록 숨기고 상세 내용 표시
            noticeContainer.innerHTML = `
                <div class="notice-detail">
                    <div class="detail-header">
                        <h3 class="detail-title">${notice.title}</h3>
                        <div class="detail-meta">
                            <span>작성일: ${notice.date}</span>
                            <span>조회수: ${notice.views}</span>
                        </div>
                    </div>
                    <div class="detail-content">
                        ${notice.content.replace(/\n/g, '<br>')}
                    </div>
                    <div class="detail-actions">
                        <a href="notice.html" class="btn-list">목록으로</a>
                    </div>
                </div>
            `;
        } else {
            alert('존재하지 않는 게시글입니다.');
            window.location.href = 'notice.html';
        }
    } else if (noticeList) {
        // 목록 렌더링
        renderList(noticeList, notices);
    }
});

function renderList(target, data) {
    target.innerHTML = '';
    data.forEach(notice => {
        const tr = document.createElement('tr');
        
        const titleHtml = notice.isImportant 
            ? `<span class="notice-badge">공지</span> ${notice.title}` 
            : notice.title;

        tr.innerHTML = `
            <td>${notice.id}</td>
            <td class="col-title"><a href="notice.html?id=${notice.id}">${titleHtml}</a></td>
            <td>${notice.date}</td>
            <td>${notice.views}</td>
        `;
        target.appendChild(tr);
    });
}