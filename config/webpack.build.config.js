const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')


module.exports = {
    bail: true,
    output: {
        filename: 'index.js',
        path: paths.build.output
    },
    entry: paths.build.entry,
    mode: 'production',
    module: {
        rules: [
            {
                exclude: [/[/\\\\]node_modules[/\\\\]/],
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    // compact: true,
                    presets: (api, opts = {}) => {

                        return {
                            presets: [
                                require('babel-preset-env').default,
                                require('babel-preset-react'),
                                require('babel-preset-stage-1')
                            ],
                            plugins: [
                                require('babel-plugin-transform-decorators-legacy').default,
                            ]
                        }
                    }
                }
            }, {
                loader: ExtractTextPlugin.extract({
                    fallback: require.resolve('style-loader'),
                    use: [
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                camelCase: true,
                                context: paths.build.cssContext, // __dirname,
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
                test: /\.mod\.scss$/
            }, {
                test: /\.html$/,
                use: {
                    loader: require.resolve('html-loader'),
                    options: { minimize: true }
                }
            }, {
                loader: require.resolve('ignore-loader'),
                test: /\.spec\.js$/
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.[hash].css',
            publicPath: '/Users/wilshotton/Work/ws-scripts/dist/bar'
        }),
        new HtmlWebpackPlugin({
            template: paths.build.html
        })
    ]
}