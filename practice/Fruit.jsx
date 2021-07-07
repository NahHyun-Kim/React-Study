const React = require('react');
const { Component } = React;
const Try = require('./Try');

// import React, { Component } from 'react';
// import Try from './Try' // Try에서 export한 것을 import

// 파일 분리하여 불러오기(const React와 같이 사용되는 것을 불러와야 함)
function getNumbers() { // 임의의 숫자 네 개 뽑기(겹치지 않게)

}

class Fruit extends Component {

    state = {
        result: '',
        input: '',
        answer: getNumbers(), // 숫자 가져오기(초기 답)
        tries: [],
    };

    // 직접 만든 메소드는 () => 로 사용 : babel이 bind(this)를 자동으로 지원해줌
    /* () => 을 사용하지 않으면 this를 사용하지 못함(에러 발생 -> cannot read property... setState 관련 undefined가 뜬다. )
        -> 이 오류를 해결하려면 constructor, this.state 사용해야 함
        constructor(props) {
        super(props);
        this.state = {
            result: '';
            };
        this.onChangeInput = this.onChangeInput.bind(this); 를 통해 선언해주어야 사용이 가능함

    */
    onSubmitForm = () => {
    };

    onChangeInput = () => {

    };

    fruits = [{ fruit: '사과', taste : '맛있다'},
        { fruit : '바나나', taste : '별로다'},
        { fruit : '멜론', taste : '달다'}
    ];

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    {/* <br/> 주석 남기는 방법 */}
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map((v, i) => {
                        return (
                            <Try key={v.fruit + v.taste} value={v} index={i}/>
                        );
                    })}

                </ul>
            </>
        )
    }
}

module.exports = Fruit;

// 파일을 분리하는 경우에 추가 작성(module.exports = WordRelay... -> 컴포넌트를 밖에서도 사용할 수 있게 해줌)

/*
map : react에서 반복문을 사용하게 함
배열 { [].map( () => { return ( <li>반복할</li>... 형태로 실행

[] 배열로 접근하기 : ex) '사과', '맛있다'의 경우 ['사과', '맛있다'] , [또 다른 과일과 상태]... 로 [0], [1]로 배열의 인덱스 접근
{} 객체로 접근하기 : ex) { fruit : '사과', taste : '맛있다' } ... 로 v.fruit, v.taste와 같이 접근 (이름)

React에서 map 사용시 key를 적어야 한다 ex) return값에서 <li key={v.fruit}> 과 같이 지정해야 함
return 생략 가능 (바로 {}.map((v) => <li key={}>{state}</li> )} 와 같이 쓸 수 있다.
key값으로 i만 쓸 경우에는 성능 최적화에 좋지 않음

[{ fruit: '사과', taste : '맛있다'},
                        { fruit : '바나나', taste : '별로다'},
                        { fruit : '멜론', taste : '달다'}
                    ].map((v, i) => { ... 를 this.fruis.map(으로 빼고, fruits = [] 로 따로 분리하여 선언할 수 있다.

---> Try.jsx를 따로 만들어 선언할 수 있다(return ( <Try /> ) 와 같이 사용) : 반복문의 성능 문제 때문에 분리
분리 시 Try.jsx에서 {v,i}같은 속성을 인식하지 못하기 떄문에, <Try value={v} index={i} />와 같이 속성을 선언한다(=props, html의 attribute와 같음)
Try.jsx에서 this.props.value, index와 같이 접근할 수 있다.
 */