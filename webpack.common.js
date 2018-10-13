const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    entry: {
        app: ['./src/index.jsx']
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({
            title: 'Production',
            filename: 'index.html',
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        })
    ],
    output: {
        filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'public')
    },
    module: {
        loaders: [
            {
                test: /(\.js|.jsx)$/,
                exclude: /(node_modules|bower_compontents)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
            }
        ]
    }   
};