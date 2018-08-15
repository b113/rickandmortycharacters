const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './dev/index.js',
    output: {
        path: path.resolve(__dirname, 'prod'),
        filename: 'bundle.js'
    },
    mode: NODE_ENV,
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV === 'development' && 'cheap-module-eval-source-map',
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader'
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: NODE_ENV === 'development' ? (
                                '[name]_[local]_[hash:base64:5]'
                            ) : (
                                    '[hash:base64:5]'
                                )
                        }
                    }
                })
            },
            {
                test: /\.(gif|png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new CopyWebpackPlugin([
            {
                from: path.resolve('./dev/static'),
                to: path.resolve('./prod')
            }
        ])
    ]
};