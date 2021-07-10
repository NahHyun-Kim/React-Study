const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

const ResponseCheck = require('./ResponseCheck');

const Hot = hot(ResponseCheck);

ReactDOM.render(<Hot />, document.querySelector('#root'));