const paths = require('./paths')


const config = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,mjs,ts,tsx}',
        '!src/**/*.stories.{js,jsx,mjs}',
    ],
    globals: {
        'ts-jest': {
            tsConfigFile: paths.build.tsConfigTest
        },
    },
    moduleFileExtensions: [
        'js',
        'json',
        'jsx',
        'mjs',
        'node',
        'ts',
        'tsx',
        'web.js',
        'web.jsx',
        'web.ts',
        'web.tsx'
    ],
    roots: [paths.build.src],
    setupFiles: [require.resolve('./jest/polyfills.js')],
    testMatch: [
        '**/?(*.)(spec|test).{js,jsx,mjs,ts,tsx}',
    ],
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': require.resolve('./babel-transform'),
        '^.+\\.scss$': require.resolve('./css-transform.js'),
        '^.+\\.tsx?$': require.resolve('./typescript-transform.js')
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',
    ]
}

module.exports = () => config
