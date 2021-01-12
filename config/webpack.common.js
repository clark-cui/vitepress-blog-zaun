const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //压缩css
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin"); //压缩html
const TerserPlugin = require("terser-webpack-plugin"); //压缩js(webpack v5自带)
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'); //压缩图片

module.exports = {
    mode: 'production',
    entry: {
        index: ['./src/index.ts', './src/index.scss'],
    },

    module: {
        rules: [
            //处理ts
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            //处理css
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            //处理scss
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],

            },
            //处理图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                        loader: 'file-loader',
                    },
                    {
                        loader: ImageMinimizerPlugin.loader,
                        options: {
                            severityError: 'warning', // Ignore errors on corrupted images
                            minimizerOptions: {
                                plugins: ['gifsicle'],
                            },
                        },
                    },
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
            title: 'Output Management',
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html', // 我们原来的index.html，作为模板

        }),
        new MiniCssExtractPlugin({
            filename: `[name].css` //name of the chunk
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
        minimize: true, // 使用 TerserPlugin 压缩 bundle
        minimizer: [
            new HtmlMinimizerPlugin(), //压缩html
            new TerserPlugin({}), //压缩js
            new CssMinimizerPlugin({
                cache: true,
            }), //压缩css
            new ImageMinimizerPlugin({
                minimizerOptions: {
                    plugins: [
                        ['gifsicle', {
                            interlaced: true
                        }],
                        ['jpegtran', {
                            progressive: true
                        }],
                        ['optipng', {
                            optimizationLevel: 5
                        }],
                        [
                            'svgo',
                            {
                                plugins: [{
                                    removeViewBox: false,
                                }, ],
                            },
                        ],
                    ],
                },
            }),
        ],
        runtimeChunk: false,
    },
};