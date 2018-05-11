
module.exports = (api, opts = {}) => {

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
