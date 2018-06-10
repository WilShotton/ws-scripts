'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')
const getEnv = require('../utils/get-env')
const getSettings = require('../utils/get-settings')
const paths = require('./paths')


const NODE_MODULES = /[/\\\\]node_modules[/\\\\]/

const env = getEnv()
const settings = getSettings(env.raw)

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
                // eslint-disable-next-line
                enforce: 'pre',
                exclude: [NODE_MODULES],
                include: paths.srcPaths,
                use: [
                    {
                        loader: require.resolve('eslint-loader'),
                        options: {
                            baseConfig: {
                                extends: [require.resolve('./eslint-config')],
                            },
                            eslintPath: require.resolve('eslint'),
                            ignore: false,
                            useEslintrc: false,
                        },
                    }
                ],
            },
            {
                oneOf: [
                    {
                        test: /\.tsx?$/,
                        // eslint-disable-next-line
                        exclude: [NODE_MODULES],
                        use: [{
                            loader: require.resolve('ts-loader'),
                            options: {
                                // disable type checker - we will use it in fork plugin
                                // transpileOnly: true,
                                configFile: paths.build.tsConfig
                            },
                        }]
                    }, {
                        test: /\.(js|jsx|mjs)$/,
                        // eslint-disable-next-line
                        exclude: [NODE_MODULES],
                        include: paths.build.src,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            cacheDirectory: true,
                            highlightCode: true,
                            presets: require('./babel.config'),
                        }
                    }, {
                        test: /\.mod\.scss$/,
                        // eslint-disable-next-line
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
        path: paths.build.output,
        publicPath: '/'
    },
    performance: {
        hints: false
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'style.[hash].css' }),
        new HtmlWebpackPlugin({ template: paths.build.html }),
        new InterpolateHtmlPlugin(settings),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(env.stringified),
    ],
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: paths.build.tsConfig
            })
        ]
    }
}
