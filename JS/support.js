// support.js
console.log('Support JS loaded');
// FAQ 토글 기능 구현
document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            // 클릭된 질문의 바로 다음 형제 요소(답변)를 찾음
            const answer = question.nextElementSibling;
            
            // 현재 display 상태에 따라 토글 (none <-> block)
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
});