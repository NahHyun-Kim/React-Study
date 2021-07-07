const React = require('react');
const ReactDom = require('react-dom');

// 분리한 파일을 불러와 합칠 수 있다. 필요한 파일만 불러올 수 있음
const Fruit = require('./RenderTest');

ReactDom.render(<Fruit />, document.querySelector('#root'));