document.addEventListener('DOMContentLoaded', () => {
    // 운동 안내 탭 전환 기능
    const tabButtons = document.querySelectorAll('.guide-tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const equipment = this.getAttribute('data-equipment');
            
            // 모든 탭 버튼의 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 모든 컨텐츠 숨기기
            document.querySelectorAll('.guide-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 선택된 컨텐츠만 표시
            const targetContent = document.getElementById(equipment);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});