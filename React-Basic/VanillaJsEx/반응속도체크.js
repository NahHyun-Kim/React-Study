var screen = document.querySelector('#screen');
var startTime;
var endTime;
var record = [];
var timeOut;

// 클릭 시 반응 속도 체크, 상태에 따라 클래스 변경
screen.addEventListener('click', function() {
    if (screen.classList.contains('waiting')) { // 현재 대기 상태라면
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요';

        timeOut = setTimeout(function() {
            startTime = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000); // 2000~3000 사이 랜덤으로 설정
        } else if (screen.classList.contains('ready')) { // 준비 상태
            if (!startTime) {
                clearTimeout(timeOut); //초기화
                screen.classList.remove('ready');
                screen.classList.add('waiting');
                screen.textContent = '너무 성급하시군요!'; // 부정 클릭 시 초기화
            } else {
                screen.classList.remove('ready');
                screen.classList.add('now'); // 초록색으로 클릭할때까지 반응 속도를 체크하는 now class
                screen.textContent = '클릭하세요!';
            }
    } else if (screen.classList.contains('now')) { // 시작 상태라면 시간 체크
        endTime = new Date();
        console.log('반응속도 : ', endTime - startTime, 'ms');
        record.push(endTime - startTime); // 기록에 추가
        startTime = null;
        endTime = null; // 시작, 끝시간 초기화
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요';
    }
})