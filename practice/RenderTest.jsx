const React = require('react');
const { PureComponent } = React;

class Test extends PureComponent {

    state = {
        // PureComponent가 선언된 상태값의 변화를 보고 판단함
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [], // PureComponent는 새로운 객체 or 배열이 아니면 알아채지 못함
    }

    // shouldComponentUpdate : 어떤 경우에 렌더링을 다시 해줄지 정의함(불필요한 렌더링으로 인한 성능 저하 방지)
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         // 값이 달라지면 렌더링이 필요함
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        const array = this.state.array;
        array.push(1);
        this.setState({
            // 기존 array: array로 하면 Component가 변화를 알아채지 못함.
            array: [...this.state.array, 1],
        })
    };

    render(){
        console.log('렌더링', this.state);
        return (<div>
            <button onClick={this.onClick}>클릭</button>
        </div>)
    }
}

module.exports = Test;