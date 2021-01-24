const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        birds: ['./entrance/birds.js']
    },

    devtool: 'inline-source-map',
    devServer: {
        //使用Ip
        // useLocalIp: true,
        // host: '0.0.0.0',
        port: 1099,
        contentBase: __dirname + 'dist',
        hot: true,
        openPage: 'birds.html',
        watchOptions: {
            ignored: /node_modules/
        },
        //proxy只能为string/object,不能用webpack的数组写法
        proxy: {

        },
    },
    module: {
        rules: [
            //处理ts
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            //处理js
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime',],
                        // cacheDirectory: true
                    }
                }
            },
            //处理css
            {
                test: /\.css$/,
                use: [

                    {
                        loader: 'style-loader'
                    },

                    {
                        loader: 'css-loader',
                    },
                ],
            },
            //处理scss
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],

            },
            //处理图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            //处理字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },


        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        //清理dist
        new CleanWebpackPlugin(),
        //匹配htmlY与js
        new HtmlWebpackPlugin({
            title: 'birds',
            filename: 'birds.html', // dist目录下生成的文件名
            template: './views/birds.html' // 我们原来的index.html，作为模板

        }),

    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'birds',
        publicPath: '/',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
};