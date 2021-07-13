const path = require('path')
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {

    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js']
    },

    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            options: {
                // plugin들의 모음
                presets: [
                    ['@babel/preset-env', {
                        targets : {
                            browsers: ['> 5% in KR']
                        },
                        debug: true
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            }
        }]
    },

    plugins: [
        new RefreshWebpackPlugin()
    ],

    output: {
        filename: "app.js",
        path: path.join(__dirname, 'dist'),
        publicPath: "/dist",
    },

    devServer: {
        publicPath: '/dist/',
        hot: true
    },
}