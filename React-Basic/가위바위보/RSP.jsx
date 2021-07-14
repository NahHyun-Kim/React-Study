const React = require('react')
const { Component } = React;

{/*
LifeCycle client.jsx에서 렌더링 되는 순간 class에 붙음 ->
클래스의 경우 -> constructor -> render -> ref 설정 -> componentDidMount(첫 렌더링 끝났다면)
 -> (setState/props 바꿀때 -> shouldComponentUpdate(true라면) -> render -> componentDidUpdate(리렌더링 후))
 -> 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
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

class RSP extends Component {

    state = {
        result: '',
        imgCoord : 0,
        score: 0,
    };

    // this.interval 선언
    interval;

    // 처음 렌더가 성공적으로 실행됐다면, 함께 실행(render -> didMount..) -> 리렌더링 시에는 실행 X
    // 화면에 보이자마자(=첫 렌더링), 다음 동작(가위바위보 그림 실행) 정의
    // 비동기 요청 자주 사용
    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    // 리렌더링(setState, props와 같은 경우)
    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    // 컴포넌트가 제거되기 직전, 부모가 없앴을 때
    // 비동기 요청 정리, 메모리 누수 문제 방지
    componentWillUnmount() {
        clearInterval();
    }

    // 가위, 바위, 보로 그때그때 바꾸는 changeHand 함수
    changeHand = () => {
            const { imgCoord } = this.state; // 비동기 상태에서 바깥의 변수를 참조하면 closer 문제 발생
            if (imgCoord === rspCoords.바위) { // 바위면 가위가 보이게...
                this.setState({
                    imgCoord: rspCoords.가위,
                });
            } else if (imgCoord === rspCoords.가위) {
                this.setState({
                    imgCoord: rspCoords.보,
                });
            } else if (imgCoord === rspCoords.보) {
                this.setState({
                    imgCoord: rspCoords.바위,
                });
            }
    };

    // () => 을 사용하여 메소드 분리
   onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;

        clearInterval(this.interval);
        const myScore = scores[choice]; // 해당하는 score 점수를 가져옴(가위/바위/보)
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff == 0) {
            this.setState({
                result: '비겼습니다!',
            });
        } else if ([-1, 2].includes(diff)) {
            // 옛날 점수 사용(prevState)
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다 ㅠㅠ',
                    score: prevState.score - 1,
                };
            });
        }
        // 가위바위보를 끝낸 뒤, 2초정도 기다렸다가 다시 동작
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer"
                     style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
                <div>
                    {/*<button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>*/}
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score} 점</div>
            </>
        );
    }
}

module.exports = RSP;