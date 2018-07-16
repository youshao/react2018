/**
 * 开发模式下的webpack配置
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pxtorem = require('postcss-pxtorem');
const webConfig = require('./webs-config'); //项目配置
const fs = require('fs-extra'); //文件操作库

//自定义插件
const getNowFormatDate = require('./plugin/w-getNowFormatDate'); //当前时间插件
const WScriptPlugin = require('./plugin/w-script-plugin'); //自定义JS属性插件

const outputPath = path.join(__dirname, 'src', 'webs', webConfig.name + webConfig.startPath, webConfig.outputPath || 'dist');
fs.remove(outputPath); //删除之前打包输出的文件夹


const config = {
    entry: {
        // 文件入口配置
        // 文件入口配置
        index: './src/webs/' + webConfig.name + webConfig.startPath + '/js/index',
        vendor: [
            'react-router',
            'react-redux',
            'redux'
        ]
        // 为了优化，切割代码，提取第三方库（实际上，我们将会引入很多第三方库）
    },

    output: {
        // 文件输出配置

        filename: 'bundle-' + getNowFormatDate() + '.js',
        // 命名生成的JS

        path: outputPath,
        // 目标输出目录 

        publicPath: webConfig.publicPath || '',
        // 模板、样式、脚本、图片等资源对应的server上的路径

        chunkFilename: '[name]-' + getNowFormatDate() + '.js',
        //按需加载js区块
    },

    externals: {
        //使用外链引入以下JS文件
        'react': 'React',
        'react-dom': 'ReactDOM'
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
                use: 'babel-loader',
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
                            importLoaders: 1,
                            localIdentName: '[local]',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
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
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
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
                            limit: 10000,
                            name: 'images/[name].[ext]',
                            publicPath: webConfig.publicPath || '',
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true,
        }),

        // 使用功能标记来「启用/禁用」「生产/开发」构建中的功能。
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),

        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor-' + getNowFormatDate() + '.js' }),
        // 'vendor' 就是把依赖库(比如react react-router, redux)全部打包到 vendor.js中
        // 'vendor.js' 就是把自己写的相关js打包到bundle.js中
        // 一般依赖库放到前面，所以vendor放第一个

        new HtmlWebpackPlugin({
            // template: './src/webs/allDefault/index.html',
            template: 'src/webs/' + webConfig.name + webConfig.startPath + '/index.html',
            // html模板的路径

            title: webConfig.title + '开发模式',
            // html的标题

            filename: 'index.html',
            // 文件名以及文件将要存放的位置

            favicon: './src/favicon.ico',
            // favicon路径

            inject: 'body',
            // js插入的位置，true/'head'  false/'body'

            chunks: ['vendor', 'index'],
            // 指定引入的chunk，根据entry的key配置，不配置就会引入所有页面的资源

            hash: false,
            // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
            // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

            minify: {
                // 压缩HTML文件
                removeComments: true,
                // 移除HTML中的注释

                collapseWhitespace: true,
                // 删除空白符与换行符

                processConditionalComments: true,
                // 通过缩小器处理条件注释的内容
            }
        }),

        new webpack.optimize.OccurrenceOrderPlugin(),
        // webapck 会给编译好的代码片段一个id用来区分
        // 而这个插件会让webpack在id分配上优化并保持一致性。
        // 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块

        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),

        // 自定义的插件
        new WScriptPlugin({}),
    ]
}

module.exports = config;
