
const path = require('path');
module.exports =  {
    resolve: {
        extensions: ['.js', '.jsx','.css']
    },
    entry: {
        app: ['./src/index.jsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('./build'),
        publicPath: '/build/'
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        //contentBase: './build'
    },
    module: {
        loaders: [
            { 
                test: /(\.js|.jsx)$/, 
                exclude: '/node_modules/',
                loader: 'babel-loader',
                query:{
                    presets:['es2015']
                } 
            },
            { test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            }
        ]
    }
}

