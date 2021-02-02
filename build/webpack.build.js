const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin"); // 压缩html
const TerserPlugin = require("terser-webpack-plugin"); // 压缩js(webpack v5自带)

module.exports = {
    mode: 'production',
    entry: {
        homeSite: ['./src/index.ts', './src/scss/index.scss'],
    },

    module: {
        rules: [
            // 处理ts
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
              // 处理js
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime', ],
                    }
                }
            },
            // 处理css
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ''
                    }
                },
                {
                    loader: 'css-loader',
                },
                ],
            },
            // 处理scss
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],

            },
            // 处理图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]',
                        publicPath: '/',// 图片在浏览器访问时候添加的path
                        outputPath: 'assets' // 图片在dist中的路径
                    }
                },

                ]
            },
            // 处理字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            },



        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        // 清理dist
        new CleanWebpackPlugin(),
        // 匹配htmlY与js
        new HtmlWebpackPlugin({
            title: 'clark-cui',
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html', // 我们原来的index.html，作为模板

        }),
        new MiniCssExtractPlugin({
            filename: `[name].css` // name of the chunk
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    optimization: {
        minimize: true, // 使用 TerserPlugin 压缩 bundle
        minimizer: [
            new HtmlMinimizerPlugin(), // 压缩html
            new TerserPlugin({}), // 压缩js
            new CssMinimizerPlugin({
                cache: true,
            }), // 压缩css
        ],
        runtimeChunk: false,
    },
};