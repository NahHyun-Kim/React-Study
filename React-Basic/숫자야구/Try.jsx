const React = require('react');
const { Component } = React;

class Try extends Component {

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

module.exports = Try;