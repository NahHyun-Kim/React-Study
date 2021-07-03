const path = require('path');
const webpack = require('webpack');

module.exports = {

    mode: 'development',
    devtool: 'eval', //production일때는 hidden-source-map 사용
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
                            // targets로 지원할 broswer를 정할 수 있음(상세 설정 가능)
                            // 한국에서 5% 이상 지원하는 브라우저만..(env로 설정 가능)
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                            // browserslist에서 browser 설정할 것
                        },
                       debug: true,
                   }],
                   '@babel/preset-react'
               ],
                plugins: [],
            }
        }],
    },

    // plugins(확장 프로그램)
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true})
    ],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
}