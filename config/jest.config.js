const paths = require('./paths')


const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
    setupFiles: [require.resolve('./jest/polyfills.js')],
    testMatch: [
        // '**/__tests__/**/*.{js,jsx,mjs}',
        '**/?(*.)(spec|test).{js,jsx,mjs}',
    ],
    roots: [paths.build.src],
    // testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': require.resolve('./babel-transform'),
        '^.+\\.scss$': require.resolve('./css-transform.js'),
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
        // '^.+\\.scss$'
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
