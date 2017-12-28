/**
 * 开发模式下的webpack配置
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const webConfig = require('./webs-config'); //项目配置

const config = {
    entry: [
        // 文件入口配置
        'babel-polyfill',
        'react-hot-loader/patch',
        // './src/webs/allDefault/js/index.js',
        path.resolve(__dirname, 'src/webs/' + webConfig.name + webConfig.startPath + '/js/index.js')
    ],

    output: {
        // 文件输出配置

        filename: 'bundle.js',
        // 命名生成的JS

        path: path.resolve(__dirname, 'dist'),
        // 目标输出目录 

        publicPath: '',
        // 模板、样式、脚本、图片等资源对应的server上的路径

        library: 'cxyKeyboard',
        // 库名
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'src/webs/' + webConfig.name + webConfig.startPath),
        port: '8888',
        hot: true,
        host: '0.0.0.0',
        allowedHosts: [
            'weichao.cx580.com',
        ]
    },

    resolve: {
        // webpack 解析模块时应该搜索的目录
        modules: ["node_modules"],

        // 自动解析确定的扩展
        extensions: ['.web.js', '.js', '.json'],

        // 路径别名, 懒癌福音
        alias: {
            app: path.resolve(__dirname, 'src/js'),
            // 以前你可能这样引用 import { Nav } from '../../components'
            // 现在你可以这样引用 import { Nav } from 'app/components'

            style: path.resolve(__dirname, 'src/styles')
            // 以前你可能这样引用 @import "../../../styles/mixins.scss"
            // 现在你可以这样引用 @import "style/mixins.scss"
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-class-properties', 'transform-runtime']
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader', options: {
                            modifyVars: { "@hd": "1px" }
                        }
                    },
                ],
                include: path.resolve(__dirname, 'node_modules'),
            },
            {
                // 项目公有样式，不需要私有化，单独配置
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/webs/' + webConfig.name + webConfig.startPath + '/styles'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[local]',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
                            sourceMap: true,
                            plugins: (loader) => [
                                require('precss')(),
                                require('autoprefixer')(),
                                require('rucksack-css')(),
                                pxtorem({
                                    rootValue: 100,
                                    propWhiteList: [],
                                })
                            ]
                        }
                    },
                ]
            },
            {
                // 项目组件样式，需要私有化，单独配置
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/webs/' + webConfig.name + webConfig.startPath + '/js'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
                            sourceMap: true,
                            plugins: (loader) => [
                                require('precss')(),
                                require('autoprefixer')(),
                                require('rucksack-css')(),
                                pxtorem({
                                    rootValue: 100,
                                    propWhiteList: [],
                                })
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.(gif|jpe?g|png|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),

        // 使用功能标记来「启用/禁用」「生产/开发」构建中的功能。
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: true
        }),

        new HtmlWebpackPlugin({
            // template: './src/webs/allDefault/index.html',
            template: 'src/webs/' + webConfig.name + webConfig.startPath + '/index.html',
            // html模板的路径

            title: webConfig.title + '开发模式',
            // html的标题

            filename: 'index.html',
            // 文件名以及文件将要存放的位置

            // favicon: './src/favicon.ico',
            // favicon路径

            inject: 'body',
            // js插入的位置，true/'head'  false/'body'

            // chunks: ['main'],
            // 指定引入的chunk，根据entry的key配置，不配置就会引入所有页面的资源

            hash: false,
            // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
            // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

            // minify: {
            //     // 压缩HTML文件
            //     removeComments: true,
            //     // 移除HTML中的注释

            //     collapseWhitespace: true,
            //     // 删除空白符与换行符
            // }
        }),

        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = config;
