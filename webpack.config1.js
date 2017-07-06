var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// “__dirname”是Node.js中的一个全局变量，它指向当前执行脚本所在的目录。
module.exports = {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

    entry: __dirname + '/src/index.jsx', //已多次提及的唯一入口文件

    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },

    module: { //在配置文件里添加JSON loader
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, //在webpack的module部分的loaders里进行配置即可
            {
                test: /\.css$/,
                loader: 'style!css?modules!'
            }, //添加对样式表的处理 感叹号的作用在于使同一文件能够使用不同类型的loader
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件,
        new ExtractTextPlugin('build.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    devServer: {
        contentBase: './src', //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    }
}
