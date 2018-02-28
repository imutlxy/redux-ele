'use strict';

const path = require('path');
const webpack = require('webpack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

const output = Object.assign(baseConfig.output, {filename: 'assets/js/[name].[chunkhash].js'});
Object.assign(baseConfig, {output: output});
let config = Object.assign({}, baseConfig, {
    entry: defaultSettings.entry,
    cache: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ParallelUglifyPlugin({
            uglifyES:{
                ie8: true,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true
                }
            }
        }),
        new webpack.HashedModuleIdsPlugin({ // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 8
        }),
        // 模块串联功能。之前，webpack 会为每个模块创建各自的闭包，使用串联功能将模块连接到一起后，就只需为这真个模块创建一个单独的闭包，从而减少不必要的代码
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ].concat(defaultSettings.plugins),
    module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
// js 处理，使用 babel 进行转码
config.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: 'happypack/loader?id=js-prod',
    include: [].concat(
        defaultSettings.additionalPaths,
        [path.join(__dirname, '/../src')]
    )
});

module.exports = config;
