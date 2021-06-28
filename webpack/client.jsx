const React = require('react');
const ReactDom = require('react-dom')

// 분리(쪼갠)한 파일을 불러와 다시 합칠 수 있다(필요한 파일만 불러와서 사용)
const WordRelay = require('./WordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root'));

//<!--npm run 스크립트명 --> webpack 실행-->