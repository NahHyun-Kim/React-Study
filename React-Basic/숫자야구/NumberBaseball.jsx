// import React, { Component } from 'react';
const React = require('react'); //(default)
const { Component } = React; //(const 변수)
const { createRef } = React; // React.createRef()  사용 -> createRef() 선언 후 변수명.current.focus()
const Try = require('./Try');

function getNumbers() { // 임의의 숫자 네 개 뽑기(겹치지 않게)
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i< 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * ( 9 - i )), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {

    state = {
        result: '',
        value: '', // 입력해서 추측하는 숫자
        answer: getNumbers(), // 숫자 가져오기(초기 답) [1,3,5,7]
        tries: [], // react에서는 push 쓰지 않음
    };

    constructor(props) {
        super(props);

        // 함수 내 다른 동작을 할 수 있음(this.props.filter(() => 로 filtered...등 응용 가능)
        this.state = {
            result: this.props.result,
            try: this.props.try,
        };
    };

    // 직접 만든 메소드는 () => 로 사용(쓰지 않으면 constructor를 사용해야 함
    onSubmitForm = (e) => {
        e.preventDefault();
        // 입력받은 값과 getNumber()로 생성한 숫자값이 일치하면(join으로 합침)
        if (this.state.value === this.state.answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!'}],
                }
            });
            // 홈런일 때도, 숫자 초기화 및 게임 다시 시작
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answerArray.join(',')}였습니다!`,

                });
                alert('게임을 다시 시작합니다!');
                // 새로운 게임을 시작하기 때문에 초기화
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
                this.inputRef.current.focus();
            } else { // 10번이 되지 않게 틀린 경우
                for (let i=0; i<4; i++) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1; // 자리와 숫자가 모두 일치하는 경우 Strike
                    } // 자리는 일치하지 않으나 같은 숫자를 포함하면 Ball
                    else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                // 실패한 tries에 데이터 추가
                this.setState((prevState) => {
                    return {
                        // push를 사용하지 않으므로, 복사한 배열([...배열명] 에 값을 넣어줌), `${ball}`의 형태로 변수에 접근
                        tries: [...prevState.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: '',
                    }
                });
                this.inputRef.current.focus();
            }
        };
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value
        })
    };

    /*
    * onInputRef = (c) => { 형태로 사용하면(함수형) 좀더 유동적으로 사용 가능
    * this.inputRef = c;
    * */
    inputRef = createRef();

    // render() 안에는 setState() 사용하지 않음
    render() {
        {/* 구조분해로 사용할 수 있음 (this.state.result로 매번 접근하지 않아도 됨) */}
        const { result, value, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <Try key={`${i+1}차 시도 : `} tryInfo={v} />
                        );
                    })}

                    {/* 즉시 실행 함수로 만들기(for문 사용 가능)
                        {(() => {
                            const arary = [];
                            for (let i=0; i<tries.length; i++) {
                                array.push(<Try key={`${i+1}차 시도 : ${v.try}`} tryInfo={v} />);
                            }
                            return array;
                        })()}
                    */}
                </ul>
            </>
        )
    }
}

module.exports = NumberBaseball;
// exports 되는 것이 객체나 배열이면 구조 분해할 수 있다.
// export const hello = 'hello'; 처럼 변수나 값을 따로 export가 가능함 // import { hello }; 형태로 가져옴
// export default NumberBaseball; // import NumberBaseball; 형태로 가져옴(default는 한번만, 그 외는 여러번)

// webpack.config.js 와 같이 node가 돌리는 webpack의 경우에는 const로 사용(import X), jsx 등은 const 로 사용
// const React = require('react'); --> 노드의 모듈문법(commonJs) 노드 자체에서는 import를 사용하지 않음(react상에서는 babel이 변경)
// module.exports = NumberBaseball;
// exports.hello = 'hello';

// map(배열을 1:1로 짝지어줌)