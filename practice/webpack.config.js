const path = require('path'); // node 기술
//const nodeExternals = require('webpack-node-externals'); // cannot find src 오류 해결을 위한 플러그인 설치 및 해결
//const createExpoWebpackConfigAsync = require('@expo/webpack-config');


module.exports = {
    name: 'word-relay-setting',
    mode: "development", // 실 서비스 시 production으로 변경
    devtool: 'eval',
    resolve: {
        extensions: ['.js','.jsx'] // 확장자를 미리 지정하여 entry에 확장자를 붙이지 않아도 인식하도록 처리
    },

    entry: {
        app: ['./client'], // 이미 client.jsx가 wordRelay를 불러오기 때문에 './WordRelay.jsx'는 생략 가능

    }, // 입력(ex-> client+wordrelay를 하나의 파일로 만들어야 함)

    output: {
        path: path.join(__dirname, 'dist'), // 합쳐질 경로 지정(현재 폴더 안의 dist)
        filename: 'app.js'
    }, // 출력

    // preset-env(최신 문법이 옛날 브라우저에서도 돌아갈 수 있게 맞춰줌), react(jsx 문법 지원)
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets:
                    ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    //target: 'node',
    //externals: [nodeExternals()],

};

//   package.json 파일에 "scripts": {
//     "dev" : "webpack"
//   }, --> 스크립트명이 dev. --> npm run dev로 실행 가능(웹팩)
// 또는 npx webpack 으로 실행

// 실행 오류 해결 : babel을 읽을 수 있게 npm에도 babel 관련 설정 설치 + config.js에 module={} 부분으로 babel을 사용할 수 있게 설정