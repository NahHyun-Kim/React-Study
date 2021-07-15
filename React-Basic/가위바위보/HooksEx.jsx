const React = require('react')
const { useState, useRef, useEffect, memo } = React;

{/* Hooks에서는 class 의 lifeCycle과 다르게 useEffect를 사용
세로로 동작(useEffect 하나가 result라는 state 담당, 각각 하나씩 담당한다고 생각)
class 는 가로로 담당
                        result, imgCoord, score
componentDidMount
componentDidUpdate
componentWillUnmount

class에서는 setState({ })로 result, imgCoord, scord에 대해 한번에 정의한다면
Hooks에서는 useEffect를 세번 또는 두번(묶을 수 있음) 사용
    useEffect(() => { setImgCoord(); }, [imgCoord]); : [] 배열에 넣은 state만 해당 useEffect()에서 처리
*/}
const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px',
};

const scores = {
    가위 : 1,
    바위 : 0,
    보 :  -1,
};

// 컴퓨터가 손대고 있는 포지션 가져오기
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

// memo : 리렌더링 안 되게 방지
const RSP = memo(() => {

    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // class의 세가지 lifecycle을 모두 합쳐둔 것이 useEffect(Hooks 사용 시)
    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1:1 대응은 아님)
        interval.current = setInterval(changeHand, 100);

        // 매번 clearInterval을 하기 떄문에 setTimeout 하는것과 동일
        return () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
        // class에서 비동기 동작 시 바깥 변수를 참조하는 경우에 closer 문제가 발생했듯이, 이를 해결하는 것이 [useEffect를 실행하고 싶은 state]
        // 배열에는 꼭 useEffect를 실행할 값만 넣을 것(상관 없는 값을 넣으면 상태가 이상해질 수 있음)
    }, [imgCoord]);

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) { // 바위면 가위가 보이게...
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice) => () => {

        clearInterval(interval.current);
        const myScore = scores[choice]; // 해당하는 score 점수를 가져옴(가위/바위/보)
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff == 0) {
            setResult('비겼습니다!');
        } else if ([-1, 2].includes(diff)) {
            // 옛날 점수 사용(prevScore)
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }
        // 가위바위보를 끝낸 뒤, 2초정도 기다렸다가 다시 동작
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
    };

    return (
        <>
            <div id="computer"
                 style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
            <div>
                {/*<button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>*/}
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score} 점</div>
        </>
    );
});

module.exports = RSP;