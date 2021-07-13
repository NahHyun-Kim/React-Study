// setInterval() 함수 : 일정한 시간 간격으로 작업 수행 (setTimeout:일정한 시간 후 작업 실행) -> clearXX로 다음 작업 스케줄 중지)
var imgRef = '0';
var RSP = { // 딕셔너리 자료구조
    rock : '0',
    scissors : '-142px',
    paper: '-284px',
};

function computerChoice(imgRef) {
    // Object.entries() : 열거 가능한 enumerable 속성 쌍의 배열을 반환,
    // .find(callback, 인자) : 주어진 판별 함수를 만족하는 첫 번째 요소의 값 반환(만족할 때까지 실행)
    return Object.entries(RSP).find(function(v) {
        return v[1] === imgRef;
    })[0];
}

var interval;
function makeInterval() {
    interval = setInterval(function() {
        if (imgRef === RSP.rock) {
            imgRef = RSP.scissors;
        } else if (imgRef === RSP.scissors) {
            imgRef = RSP.paper;
        } else {
            imgRef = RSP.rock;
        }
        document.querySelector('#computer').style.background =
            'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgRef + ' 0';
    }, 100);
}

makeInterval();

var score = {
    scissors: 1,
    rock: 0,
    paper: -1,
}

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        clearInterval(interval); //setInterval 작업 중지
        setTimeout(function() {
            makeInterval();
        }, 1000);

        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var computerScore = score[computerScore(imgRef)];
        var scoreDiff = myScore - computerScore;

        if (scoreDiff === 0) {
            alert('비겼습니다.');
            // .includes 함수를 이용해서 -1 또는 2가 나왔다면 이겼다고 반환
        } else if ([-1, 2].includes(scoreDiff)) {
            alert('이겼습니다.');
        } else {
            alert('졌습니다 ㅠㅠ');
        }
    })
})

var startScore = 3;
var interval2 = setInterval(function() {
    if (startScore === 0) {
        console.log('종료합니다!');
        return clearInterval(interval2);
    }
    console.log(startScore);
    startScore -= 1;
}, 1000);