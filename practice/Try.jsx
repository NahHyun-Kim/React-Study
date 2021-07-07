const React = require('react');
const { Component } = React;

// Component의 사용 이유 : 재사용성
// Fruit에서 props로 전달한 것을 this.props.전달한 이름 으로 접근하여 사용
// Fruit이 Try의 부모가 됨(props를 물려주는 Fruit, 전달받아 접근하는 자식 Try)
class Try extends Component {
    render() {
        return (
            <li key={this.props.value + this.props.index}>
                <b>{this.props.value.fruit}</b> - {this.props.index}
                <div>컨텐츠0</div>
                <div>컨텐츠1</div>
                <div>컨텐츠2</div>
                <div>컨텐츠3</div>
            </li>
        )
    }
}

module.exports = Try;
//export default Try; // 다른 파일에서 불러올 수 있게 export, ctrl+b로 부모 확인 가능