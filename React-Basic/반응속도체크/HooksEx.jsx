const React = require('react');
const { PureComponent } = React;
const { useState, useRef } = React;
// import React, { useState } from 'react';

// hooks 사용시 this를 거의 사용하지 않음
const HooksEx = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    // class 에서 timeout, endTime, startTime과 같이 초기화준 값을 hooks에서 사용할 때는 ref를 사용한다.(this의 속성을 ref로 표현)
    // 값이 바뀌어도 렌더링을 하고 싶지 않은 경우 useRef를 통해 사용(timeout, interval 등 사용)
    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        const { state, message, result } = this.state;
        // 파란 화면일 때 클릭한 경우
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            // useRef 사용시 .current로 사용한다.(Ref 안의 current로 사용)
            timeout.current = setTimeout( () => {
                setState('now');
                setMessage('지금 클릭!');
                startTime.current = new Date(); // 렌더링을 필요로 하지 않음(this.startTime..과 같이 만들기)
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤

        } else if (state === 'ready') { // 성급하게 클릭(부정)
            clearTimeout(this.timeout);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');

        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date(); // 초록색을 클릭하면 시간 마감, end - start로 반응 시간 체크

            setState('waiting');
            setMessage('클릭해서 시작하세요!');
            setResult((prevResult) => {
                {/* Ref 면 무조건 current로 접근 */}
                return [...prevResult, endTime.current - startTime.current];
            });

        }
    };

    const onReset = () => {
        setResult([]); // result 비우기
    };

    const renderAverage = () => {
            {/* reduce : 합계를 구해서, 전체 수로 나누어 평균 구하기(평균시간),
                 reduce는 값이 없을 때 동작하지 않음(없으면 div 태그를 보여주지 않음)
                 *** jsx에서의 false, undefined, null은 태그 없음을 의미 */}
            return result.length === 0 /* legnth !==0 && <div>.. */
                ? null
                : <><div>평균 시간 : {result.reduce((a, c) => a + c )/ result.length}ms</div>
                    <button onClick={onReset}>초기화</button>
                </>
        };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={this.onClickScreen}
            >
                {message}
            </div>
            {(()=> {
                if (result.length === 0) {
                    return null;
                } else {
                    return <>
                        <div>평균 시간 : {result.reduce((a, c) => a + c )/ result.length}ms</div>
                        <button onClick={onReset}>초기화</button>
                    </>
                }
            })()}
            {/*{renderAverage()} 대신 직접 if문 사용, 즉시 실행 함수 */}
        </>
    );
};


module.exports = HooksEx;