const React = require('react');
const { useState } = React;
//const Try = require('./Try');

function getNumbers() { // 임의의 숫자 네 개 뽑기(겹치지 않게)
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const HooksEx = () => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    // hooks에서 ref 사용 시 inputRef.current.focus();와 같이 current, useRef 사용

    // 직접 만든 메소드는 () => 로 사용(쓰지 않으면 constructor를 사용해야 함
    const onSubmitForm = (e) => {
        const { value, tries, answer } = this.state;
        e.preventDefault();

        // 예전 값으로 현재 값을 만들 때는 함수형 setState(prevState) 와 같이 사용용
       // 입력받은 값과 getNumber()로 생성한 숫자값이 일치하면(join으로 합침)
        if (this.state.value === this.state.answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!'}],
                }
            });
            // 홈런일 때도, 숫자 초기화 및 게임 다시 시작
            setResult('홈런!');
            // 함수형으로 리턴(기존 prevTries의 값을 현재 값으로 만듬)
            setTries((prevTries) => {
                return [...prevTries.tries, { try: value, result: '홈런'}]
            });
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            tries: []

        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answerArray.join(',')}였습니다!`);
                alert('게임을 다시 시작합니다!');
                // 새로운 게임을 시작하기 때문에 초기화
                setValue('');
                setAnswer(getNumbers());
                setTries([]);

            } else { // 10번이 되지 않게 틀린 경우
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1; // 자리와 숫자가 모두 일치하는 경우 Strike
                    } // 자리는 일치하지 않으나 같은 숫자를 포함하면 Ball
                    else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                // 실패한 tries에 데이터 추가
                setTries((prevTries) => [...prevTries.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}])
                setValue('');
            }
        }
        ;
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    // jsx는 배열 안에 JSX를 담아 리턴하는 것이 가능하다.(key 필수, 참고만)
    // return [
    //     <div key="사과">사과</div>,
    //     <div key="배">배</div>,
    //     <div key="감">감</div>
    // ];

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도 : `} tryInfo={v}/>
                    );
                })}

            </ul>
        </>

    );

};
