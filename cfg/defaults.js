/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const marked = require('marked');
const renderer = new marked.Renderer();

const minimize = process.env.REACT_WEBPACK_ENV === 'dist';

const srcPath = path.join(__dirname, '/../src');
const dfltPort = 3000;

/**
 * Get the default modules object for webpack
 */
function getDefaultModules() {
    return {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                enforce: 'pre',
                use: 'eslint-loader'//js,jsx 预处理，先通过 eslint 语法校验
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-loader']
            },
            //css加载
            {
                test: /\.css$/,
                //通过 webpack-replace 替换文本内容，将 font 字体改为本地加载，参数可以使用 JSON.stringify 处理
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: minimize
                        }
                    }]
                })
            },
            //sass 加载，先通过 sass-loader 转化为 css，然后跟普通的 css 加载一样
            {
                test: /\.(sass|scss)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: minimize
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                minimize: minimize,
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            },
            //less 加载，先通过 less-loader 转化为 css，然后跟普通的 css 加载一样
            {
                test: /.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: minimize
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                minimize: minimize
                            }
                        }
                    ]
                })
            },
            // 字体文件(eg: .ttf/.ttf?v=123)
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/media/[name].[hash:8].[ext]'
                }
            },
            // 音频视频等多媒体文件
            {
                test: /\.(mp4|ogg|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/media/[name].[hash:8].[ext]'
                }
            },
            // 图片加载，如果小于 8KB，则使用 base64 数据加载，否则使用普通文件的方式加载
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'assets/images/[name].[hash:8].[ext]'
                }
            }
        ]
    };
}

//自动从 entries 获取需要打包的 js 文件
const files = glob.sync('./src/*.jsx');
let entryKeys = [];
const entries = files.reduce(function (memo, file) {
    const name = path.basename(file, path.extname(file));
    entryKeys.push(name);
    memo[name] = file;
    return memo;
}, {
    boot: 'uwd/lib/boot',
    // 凡是加到 vendor 中的模块，都会被全部打包到 vendor.js
    // 例外:
    // lodash 应该按需加载，由对应插件处理，打包到 index.js 中
    vendor: [
        'ajv',
        'ajv-i18n/localize/zh',
        'classnames',
        'hotkeys-js',
        'i18next',
        'i18next-browser-languagedetector',
        'immutability-helper',
        'immutable',
        'react-dnd',
        'react-dnd-html5-backend',
        'react-i18next',
        'react-redux',
        'redux',
        'redux-devtools',
        'redux-devtools-dock-monitor',
        'redux-devtools-log-monitor',
        'redux-slider-monitor',
        'redux-thunk',
        'redux-undo',
        'sockjs-client',
        'webstomp-client',
        'tether-shepherd',
        'title-notify',
        'uuid'
    ]
});

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
    additionalPaths: additionalPaths,
    srcPath: srcPath,
    entry: entries,
    entryKeys: entryKeys,
    publicPath: './',
    port: dfltPort,
    getDefaultModules: getDefaultModules,
    markdownLoader: {
        markedOptions: {
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: true,
            sanitize: true,
            smartLists: true,
            smartypants: true
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new LodashModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            //可以指定多个 entryName，打出多个 common 包
            names: ['common', 'vendor', 'boot'], // 最后一项包含 webpack runtime
            minChunks: 2 // 被引用超过2次的模块放入common.js (对多页有意义，单页不会生成 common.js)
        }),
        new CopyWebpackPlugin([
            {from: 'node_modules/@ud/uwd-manuals/html', to: 'manuals/'},
            {from: 'node_modules/@ud/uwd/dist', to: './'},
            {from: 'node_modules/font-awesome', to: 'lib/font-awesome/'},
            {from: 'node_modules/axios/dist', to: 'lib/axios/dist/'},
            {from: 'node_modules/react/dist', to: 'lib/react/dist/'},
            {from: 'node_modules/react-dom/dist', to: 'lib/react-dom/dist/'},
            {from: 'node_modules/jsoneditor/dist', to: 'lib/jsoneditor/dist/'},
            {from: 'node_modules/@ud/polyfills/lib', to: 'lib/polyfills/'},
            {from: 'node_modules/@ud/font-awesome/build', to: 'lib/ud-font-awesome/'},
            {from: 'node_modules/jquery/dist', to: 'lib/jquery/dist/'}
        ], {
            ignore: [
                '*.less',
                '*.scss'
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'test',
            favicon: 'node_modules/@ud/uwd/lib/favicon.png',
            template: 'node_modules/@ud/uwd/lib/app/index.ejs',
            stylesheets: [],
            scripts: [
                'lib/jquery/dist/jquery.min.js'
            ],
            chunks: ['boot', 'vendor', 'common', 'index'], // 页面应用哪些chunks
            minify: {
                removeComments: true,
                collapseWhitespace: minimize
            }
        })
    ]
};
