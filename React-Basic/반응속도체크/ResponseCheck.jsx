const React = require('react');
const { PureComponent } = React;

class ResponseCheck extends PureComponent {

    /* 상태 변화 : 배경색, 택스트, 반응 시간 관련 */
    state = {
        state : 'waiting', // ready - now - waiting ...
        message: '클릭해서 시작하세요.',
        result: [], // 시간 state
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        // 파란 화면일 때 클릭한 경우
        if (state === 'waiting') {
            this.setState({
                state : 'ready',
                message : '초록색이 되면 클릭하세요',
            });
            this.timeout = setTimeout( () => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭!',
                    // 초록색이 된 순간부터 클릭하는 순간까지(end - start) 반응속도가 된다.
                });
                this.startTime = new Date(); // 렌더링을 필요로 하지 않음(this.startTime..과 같이 만들기)
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤

        } else if (state === 'ready') { // 성급하게 클릭(부정)
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
                // 기존에 setTimeout()을 초기화 시킴
            })

        } else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date(); // 초록색을 클릭하면 시간 마감, end - start로 반응 시간 체크

            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    result: [...prevState.result, this.endTime - this.startTime],
                    message: '클릭하여 시작하세요!',
                }
            })
        }
    };

    // 결과 비우기(result.length = 0)
    onReset = () => {
      this.setState({
          result: [],
      })
    };

    // 평균 시간 구하기(사용자 정의 함수 : () => )
    renderAverage = () => {
        const { result } = this.state;
        {/* reduce : 합계를 구해서, 전체 수로 나누어 평균 구하기(평균시간),
                 reduce는 값이 없을 때 동작하지 않음(없으면 div 태그를 보여주지 않음)
                 *** jsx에서의 false, undefined, null은 태그 없음을 의미 */}
        return result.length === 0 /* legnth !==0 && <div>.. */
            ? null
            : <><div>평균 시간 : {result.reduce((a, c) => a + c )/ result.length}ms</div>
                <button onClick={this.onReset}>초기화</button>
                </>
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