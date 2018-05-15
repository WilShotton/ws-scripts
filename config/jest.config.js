const paths = require('./paths')


const config = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,mjs}',
        '!src/**/*.stories.{js,jsx,mjs}',
    ],
    setupFiles: [require.resolve('./jest/polyfills.js')],
    testMatch: [
        '**/?(*.)(spec|test).{js,jsx,mjs}',
    ],
    roots: [paths.build.src],
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': require.resolve('./babel-transform'),
        '^.+\\.scss$': require.resolve('./css-transform.js'),
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
    ],
    moduleFileExtensions: [
        'web.js',
        'mjs',
        'js',
        'json',
        'web.jsx',
        'jsx',
        'node',
    ]
}

module.exports = () => config
