const React = require('react');
const { Component } = React;

class ResponseCheck extends Component {

    /* 상태 변화 : 배경색, 택스트, 반응 시간 관련 */
    state = {
        state : '', // ready - now - waiting ...
        message: '클릭해서 시작하세요.',
        result: [], // 시간 state
    };

    onClickScreen = () => {

    };

    // 평균 시간 구하기(사용자 정의 함수 : () => )
    renderAverage = () => {
        const { result } = this.state;
        {/* reduce : 합계를 구해서, 전체 수로 나누어 평균 구하기(평균시간),
                 reduce는 값이 없을 때 동작하지 않음(없으면 div 태그를 보여주지 않음)
                 *** jsx에서의 false, undefined, null은 태그 없음을 의미 */}
        return this.state.result.length === 0 /* legnth !==0 && <div>.. */
            ? null
            : <div>평균 시간 : {this.state.result.reduce((a, c) => a + c )/ this.state.result.length}ms</div>
    };

    render() {
        const { state, message } = this.state; // 구조 분해로 길이 줄이기
        return (
            <>
            <div
                id="screen"
                className={state}
                onClick={this.onClickScreen}
            >
                {message}
            </div>
                {this.renderAverage()}
            </>
    );
    }
}

module.exports = ResponseCheck;