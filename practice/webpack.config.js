const path = require('path'); // node 기술
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
//const nodeExternals = require('webpack-node-externals'); // cannot find src 오류 해결을 위한 플러그인 설치 및 해결
//const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// 실 배포시 process.env.NODE_ENV = 'production', mode: 'production'으로 변경

module.exports = {
    name: 'word-relay-setting',
    mode: "development", // 실 서비스 시 production으로 변경
    devtool: 'eval',
    resolve: {
        extensions: ['.js','.jsx'] // 확장자를 미리 지정하여 entry에 확장자를 붙이지 않아도 인식하도록 처리
    },

    entry: {
        app: ['./client'], // 이미 client.jsx가 wordRelay를 불러오기 때문에 './Fruit.jsx'는 생략 가능

    }, // 입력(ex-> client+wordrelay를 하나의 파일로 만들어야 함)

    plugins: [
        new RefreshWebpackPlugin()
    ],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
    },

    // 개발용 서버 설정 (webpack-dev-server) -> console에 [WebpackDevServer]로 표시
    // hot-reloading : 기존 데이터를 유지하며 새로고침 지원 -> console에 [HotModuleReload] 로 표시
    // path : 실제경로, publicPath : 가상 경로
    devServer: {
        publicPath: '/dist/', // app.use('/dist', express.static(__dirname,'dist'))
        hot: true
    },

    // preset-env(최신 문법이 옛날 브라우저에서도 돌아갈 수 있게 맞춰줌), react(jsx 문법 지원)
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets:
                    ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',],
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