const React = require('react');
const ReactDOM = require('react-dom');

const { hot } = require('react-dom-loader/root');

// import NumberBaseball from './NumberBaseball';

const NumberBaseball = require('./NumberBaseball');

const Hot = hot(NumberBaseball);

ReactDOM.render(<Hot />, document.querySelector('#root'));