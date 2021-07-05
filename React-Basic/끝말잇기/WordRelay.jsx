const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('나현이');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    // 직접 만든 함수들은 () => 형식으로 사용
    // 매번 만들어지는 것이 아니라 참조됨
    const onSubmitForm = (e) => {
        e.preventDefault();
        // 끝 글자와 입력한 value의 첫 글자값이 같다면
        if (word[word.length - 1] === value[0]) {

            setResult('딩동댕');
            setWord(value);
            setValue('');
            // hooks는 ref에 항상 curret를 붙여야 함
            inputRef.current.focus();
            // this.setState({
            //     result: '딩동댕',
            //     word: this.state.value,
            //     value: '',
            // });

        } else {
           setResult('땡!');
           setValue('');
           inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    // input;
    // onRefInput = (c) => {
    //     this.input = c;
    // };

    // value+onChange를 넣지 않는 경우 defaultValue를 사용한다.
    //render() { -> hooks 사용시 render 사용하지 않고 바로 return, hooks 사용시 this 사용하지 않음
    // react에서는 label htmlFor = "id값", button className="" 과 같이 작성함(권장함)
        return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력하세요.</label>
                <input ref={inputRef} value={value} onChange={onChangeInput} />
                <button id="wordInput" className="wordInput">입력!</button>
            </form>
            <div>{result}</div>
        </>
        );
   // }
}

module.exports = WordRelay;