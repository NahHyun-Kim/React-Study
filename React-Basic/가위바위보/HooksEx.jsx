const React = require('react')
const { useState, useRef } = React;

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

const RSP = () => {

    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    const changeHand = () => {

    };

    const onClickBtn = (choice) => () => {

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
};

module.exports = RSP;