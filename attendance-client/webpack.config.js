var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: {        
        vendor: ['./src/app.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                exclude: /node_modules/,
                options: {
                    failOnHint: true,
                    configuration: require('./tslint.json')
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]                
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 15000,
                        name: '[name].[ext]',
                    },
                },
            },
            { 
                test: /\.(woff|woff2|eot|ttf|svg)$/, 
                loader: 'file-loader',
                options : {
                    name: '[name].[ext]',
                }
            },
            { 
                test: /\.html$/, 
                loader: 'file-loader',
                options : {
                    name: '[name].[ext]',
                },
                exclude: path.resolve(__dirname, 'index.html')
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            // ...
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
    ]

};