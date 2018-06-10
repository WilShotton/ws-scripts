'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const getEnv = require('../utils/get-env')
const getSettings = require('../utils/get-settings')
const paths = require('./paths')


const NODE_MODULES = /[/\\\\]node_modules[/\\\\]/

const env = getEnv()
const settings = getSettings(env.raw)

module.exports = {
    bail: true,
    entry: paths.build.entry,
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                // eslint-disable-next-line
                enforce: 'pre',
                exclude: [NODE_MODULES],
                include: paths.srcPaths,
                use: [{
                    loader: require.resolve('eslint-loader'),
                    options: {
                        baseConfig: {
                            extends: [require.resolve('./eslint-config')],
                        },
                        eslintPath: require.resolve('eslint'),
                        ignore: false,
                        useEslintrc: false,
                    },
                }],
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
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        // eslint-disable-next-line
                        exclude: [NODE_MODULES],
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            compact: true,
                            presets: require('./babel.config')
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
                                        context: paths.build.cssContext,
                                        importLoaders: 1,
                                        localIdentName: '[name]__[local]__[hash:base64:5]',
                                        // minimize: true,
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
                        }),
                    }, {
                        test: /\.html$/,
                        use: {
                            loader: require.resolve('html-loader'),
                            options: { minimize: true }
                        }
                    },
                ]
            },
            {
                loader: require.resolve('ignore-loader'),
                test: /\.spec\.js$/
            },
            // {
            //     loader: require.resolve('file-loader'),
            //     // Exclude `js` files to keep "css" loader working as it injects
            //     // it's runtime that would otherwise processed through "file" loader.
            //     // Also exclude `html` and `json` extensions so they get processed
            //     // by webpacks internal loaders.
            //     // eslint-disable-next-line
            //     exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            //     options: {
            //         name: 'static/media/[name].[hash:8].[ext]',
            //     }
            // }
        ]
    },
    node: {
        child_process: 'empty',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    output: {
        filename: 'index.js',
        path: paths.build.output
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.[hash].css'
        }),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
            template: paths.build.html,
        }),
        new InterpolateHtmlPlugin(settings),
        new UglifyJsPlugin({
            // Enable file caching
            cache: true,
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                compress: {
                    // Disabled because of an issue with Uglify breaking seemingly valid code:
                    // https://github.com/facebook/create-react-app/issues/2376
                    // Pending further investigation:
                    // https://github.com/mishoo/UglifyJS2/issues/2011
                    comparisons: false,
                    ecma: 5,
                    warnings: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebook/create-react-app/issues/2488
                    ascii_only: true,
                    comments: false,
                    ecma: 5,
                },
                parse: {
                    // we want uglify-js to parse ecma 8 code. However we want it to output
                    // ecma 5 compliant code, to avoid issues with older browsers, this is
                    // whey we put `ecma: 5` to the compress and output section
                    // https://github.com/facebook/create-react-app/pull/4234
                    ecma: 8,
                },
            },
        }),
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
