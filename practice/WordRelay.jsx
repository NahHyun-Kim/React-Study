const React = require('react');
const { Component } = React;

// 파일 분리하여 불러오기(const React와 같이 사용되는 것을 불러와야 함)
class WordRelay extends Component {
    state = {
        text: 'Hello, webpack',
    };

    render() {
        return <h1>{this.state.text}</h1>
    }
}

// 파일을 분리하는 경우에 추가 작성(module.exports = WordRelay... -> 컴포넌트를 밖에서도 사용할 수 있게 해줌)
module.exports = WordRelay;