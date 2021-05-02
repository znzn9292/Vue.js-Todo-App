const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

require('@babel/polyfill')

module.exports = (env, opts) => {
    const config = {
        // 중복되는 옵션 (개발용과 운영용)
        entry: {
            app: [
                '@babel/polyfill',
                path.join(__dirname, 'main.js')
            ]
        },
        output: {   
            filename: '[name].js',  // app.js
            path: path.join(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                test: /\.vue$/,
                use: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "index.html")
            }),
            // new CopyPlugin({
            //     patterns: [
            //         {
            //             from: 'images/',
            //             to: ''
            //         }
            //     ]
            // }),
            new CopyPlugin([
                {
                    from: 'images/',
                    to: ''
                }
            ])
        ]
    }

    // 개발용
    if(opts.mode === 'development') {
        return merge(config, {
            devtool: 'eval',
            devServer: {
                open: false,
                hot: true
            }
        })

    // 운영용
    } else {
        return merge(config, {
            devtool: 'cheap-module-source-map',
            plugins: [
                new CleanWebpackPlugin()
            ]
        })
    }

    
}