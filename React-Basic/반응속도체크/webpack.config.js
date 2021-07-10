const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {

    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            options: {
                // preset : plugin들의 모음
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            }
        }],
    },

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
}