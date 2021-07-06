// const React = require('react');
// const ReactDOM = require('react-dom');
// // import React from 'react', import ReactDOM from 'react-dom';
//
// const { hot } = require('react-hot-loader/root');
//
// // import NumberBaseball from './NumberBaseball';
//
// const NumberBaseball = require('./NumberBaseball');
//
// const Hot = hot(NumberBaseball);
//
// ReactDOM.render(<Hot />, document.querySelector('#root'));

const React = require('react');
const ReactDOM = require('react-dom');

const NumberBaseball = require('./NumberBaseball');

ReactDOM.render(<NumberBaseball />, document.querySelector('#root'));
