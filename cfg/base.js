'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

module.exports = {
    devtool: 'hidden-source-map',
    //输出配置
    output: {
        path: path.join(__dirname, './../dist/'),
        filename: 'assets/js/[name].[hash].js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: './src/',
        historyApiFallback: true,
        hot: true,
        port: defaultSettings.port,
        noInfo: false,
        disableHostCheck: true
    },
    resolve: {
        mainFiles: ['index.web', 'index'],
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.react.js'],
        modules: [defaultSettings.srcPath, 'node_modules', path.join(__dirname, '../node_modules')],
        mainFields: ['browser', 'jsnext:main', 'main']
    },
    module: {},
    externals : {
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
        axios: 'window.axios'
    }
};
