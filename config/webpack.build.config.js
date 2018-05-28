const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const paths = require('./paths')


const NODE_MODULES = /[/\\\\]node_modules[/\\\\]/

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
                        exclude: [NODE_MODULES],
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            // compact: true,
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
            }
        ]
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
            template: paths.build.html
        })
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
