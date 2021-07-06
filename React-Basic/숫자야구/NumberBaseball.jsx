// import React, { Component } from 'react';
const React = require('react'); //(default)
const { Component } = React; //(const 변수)

function getNumbers() { // 임의의 숫자 네 개 뽑기(겹치지 않게)

}

class NumberBaseball extends Component {

    state = {
        result: '',
        input: '',
        answer: getNumbers(), // 숫자 가져오기(초기 답)
        tries: [],
    };

    // 직접 만든 메소드는 () => 로 사용(쓰지 않으면 constructor를 사용해야 함
    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {[{ fruit: '사과', taste : '맛있다'},
                        { fruit : '바나나', taste : '별로다'},
                        { fruit : '멜론', taste : '달다'}
                    ].map((v, i) => {
                        return (
                            <li key={v.fruit + v.taste}><b>{v.fruit}</b> - {v.taste} </li>
                        );
                    })}

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

/*
map : react에서 반복문을 사용하게 함
배열 { [].map( () => { return ( <li>반복할</li>... 형태로 실행

[] 배열로 접근하기 : ex) '사과', '맛있다'의 경우 ['사과', '맛있다'] , [또 다른 과일과 상태]... 로 [0], [1]로 배열의 인덱스 접근
{} 객체로 접근하기 : ex) { fruit : '사과', taste : '맛있다' } ... 로 v.fruit, v.taste와 같이 접근 (이름)

React에서 map 사용시 key를 적어야 한다 ex) return값에서 <li key={v.fruit}> 과 같이 지정해야 함
return 생략 가능 (바로 {}.map((v) => <li key={}>{state}</li> )} 와 같이 쓸 수 있다.
key값으로 i만 쓸 경우에는 성능 최적화에 좋지 않음
 */