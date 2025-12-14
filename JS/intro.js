document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.querySelector('.monthly-calendars');
    if (calendarContainer) {
        const today = new Date();
        // 현재 달 달력 생성
        calendarContainer.appendChild(createCalendar(today.getFullYear(), today.getMonth()));
        // 다음 달 달력 생성
        calendarContainer.appendChild(createCalendar(today.getFullYear(), today.getMonth() + 1));
    }
});

function createCalendar(year, month) {
    // Date 객체는 month가 12를 넘어가면 자동으로 다음 해로 계산합니다.
    const date = new Date(year, month, 1);
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    const calendarDiv = document.createElement('div');
    calendarDiv.className = 'monthly-calendar';

    const title = document.createElement('h4');
    title.textContent = `${monthNames[currentMonth]} (${currentYear}년)`;
    calendarDiv.appendChild(title);

    const table = document.createElement('table');
    table.className = 'calendar';

    // 요일 헤더 생성
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // 날짜 바디 생성
    const tbody = document.createElement('tbody');
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0(일) ~ 6(토)
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate(); // 해당 월의 마지막 날짜

    let tr = document.createElement('tr');
    
    // 첫 주 빈칸 채우기
    for (let i = 0; i < firstDayIndex; i++) {
        tr.appendChild(document.createElement('td'));
    }

    // 1일부터 마지막 날까지 채우기
    for (let d = 1; d <= lastDay; d++) {
        // 한 주(7일)가 꽉 차면 다음 줄로
        if (tr.children.length === 7) {
            tbody.appendChild(tr);
            tr = document.createElement('tr');
        }

        const td = document.createElement('td');
        td.textContent = d;

        const dayOfWeek = new Date(currentYear, currentMonth, d).getDay();

        // 주말 체크 (일요일:0, 토요일:6)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            td.classList.add('weekend');
        }

        // 간단한 양력 공휴일 체크
        if (isHoliday(currentMonth + 1, d)) {
            td.classList.add('holiday');
        }

        tr.appendChild(td);
    }

    // 마지막 줄이 비어있지 않다면 추가
    if (tr.children.length > 0) {
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    calendarDiv.appendChild(table);

    return calendarDiv;
}

function isHoliday(month, day) {
    // 양력 고정 공휴일 목록 (필요시 추가 가능)
    const holidays = [
        "1-1",   // 신정
        "3-1",   // 삼일절
        "5-5",   // 어린이날
        "6-6",   // 현충일
        "8-15",  // 광복절
        "10-3",  // 개천절
        "10-9",  // 한글날
        "12-25"  // 성탄절
    ];
    return holidays.includes(`${month}-${day}`);
}