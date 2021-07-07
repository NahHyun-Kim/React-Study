const React = require('react');
const { PureComponent } = require('react');
const { memo } = require('react');

// const Try = memo(({ tryInfo }) => {
//     const [result, setResult] = useState();
//     return (
//         <li>
//             {/* {tryInfo}로 구조분해 또는 (props)로 담아 props.tryInfo로 접근*/}
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li>
//     ))
// };

// PureComponent 사용으로 자동 렌더링 방지(props, state 변경 여부 감지)
// shouldComponentUpdate로 렌더링을 안 하는 경우를 원하는 상황으로만 지정이 가능함
class Try extends PureComponent {


    // try value
    render() {
        {/* 구조 분해를 {this.props.tryInfo}를 간단하게 정의 */}
        const { tryInfo } = this.props;
        return (
            <li>
                {/* 객체 v(try, result)를 tryInfo={v}로 전달,
                this.props.tryInfo 객체 안의 try, result에 접근 */}
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

     { /* props 변경할 경우에는 직접 바꾸지 않고, state로 만들어(const [] useState로 선언)  상태로 변경한다.
          자식이 부모를 바꾸면 부모가 뜻하지 않게 바뀜 -> 자식은 props를 바꾸지 않는다.
        const [result, setResult] = useState(tryInfo.result); 로 상태로 만든다음
        const onClick = () => {
            setResult('설정할 값'); 의 형태로 상태를 변경해준다.

     */ }
// hooks에는 memo를 붙이면 props나 state가 변경시에만 렌더링(React.memo 또는 구조분해로 { memo } 선언후 memo로 사용
module.exports = Try;