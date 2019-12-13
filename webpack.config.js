require("@babel/polyfill");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    devServer:{
        contentBase: __dirname + '/dist',
        inline: true,
        open: true,
        port: 3000
    },
    entry: [
        '@babel/polyfill',
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output: {
        filename: 'fcm-button.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: 'head',
            template: './util/template.ejs'
        })
    ]
};