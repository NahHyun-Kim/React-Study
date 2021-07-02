const React = require('react');
const ReactDom = require('react-dom');

// 분리한 파일을 불러와 합칠 수 있다. 필요한 파일만 불러올 수 있음
const WordRelay = require('./WordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root'));