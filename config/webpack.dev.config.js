const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const paths = require('./paths')


module.exports = {
    bail: true,
    devtool: 'cheap-module-source-map',
    entry: [
        require.resolve('webpack-dev-server/client') + '?/',
        require.resolve('webpack/hot/dev-server'),
        paths.build.entry
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),
                            baseConfig: {
                                extends: [require.resolve('./eslint-config')],
                            },
                            ignore: false,
                            useEslintrc: false,
                        },
                        loader: require.resolve('eslint-loader'),
                    }
                ],
                include: paths.srcPaths,
                exclude: [/[/\\\\]node_modules[/\\\\]/],
            },
            {
                oneOf: [

                    {
                        test: /\.(js|jsx|mjs)$/,
                        exclude: [/[/\\\\]node_modules[/\\\\]/],
                        include: paths.build.src,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            presets: require('./babel.config'),
                            cacheDirectory: true,
                            highlightCode: true
                        }
                    }, {
                        test: /\.mod\.scss$/,
                        loader: ExtractTextPlugin.extract({
                            fallback: require.resolve('style-loader'),
                            use: [
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        camelCase: true,
                                        context: paths.build.src,
                                        importLoaders: 1,
                                        localIdentName: '[name]__[local]__[hash:base64:5]',
                                        modules: true
                                    }
                                }, {
                                    loader: require.resolve('postcss-loader'),
                                    options: {
                                        ident: 'postcss',
                                        plugins: [
                                            require('autoprefixer')
                                        ]
                                    }
                                },
                                require.resolve('sass-loader')
                            ]
                        })
                    }, {
                        test: /\.html$/,
                        use: {
                            loader: require.resolve('html-loader'),
                            options: { minimize: true }
                        }
                    }
                ]
            },
            {
                loader: require.resolve('ignore-loader'),
                test: /\.spec\.js$/
            }
        ],
    },
    output: {
        filename: 'index.js',
        path: paths.build.output
    },
    performance: {
        hints: false
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.[hash].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: paths.build.html
        })
    ]
}
