const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: '나현이',
        value: '',
        result: '',
    };

    // 직접 만든 함수들은 () => 형식으로 사용
    // 매번 만들어지는 것이 아니라 참조됨
    onSubmitForm = (e) => {
        e.preventDefault();
        // 끝 글자와 입력한 value의 첫 글자값이 같다면
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            });
            this.input.focus();
        } else {
            this.setState({
                result: '땡!',
                value: '',
            });
            this.input.focus();
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.currentTarget.value
        });
    };

    input;
    onRefInput = (c) => {
        this.input = c;
    };

    render() {
        return (
        <>
            <div>{this.state.word}</div>
            <form onSubmit={this.onSubmitForm}>
                <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                <button>입력!</button>
            </form>
            <div>{this.state.result}</div>
        </>
        );
    }
}

module.exports = WordRelay;