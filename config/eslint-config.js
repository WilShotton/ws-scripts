
module.exports = {
    env: {
        browser: true,
        jest: true,
        node: true,
    },
    extends: [
        'standard',
        'plugin:import/react',
        'plugin:import/recommended',
        'plugin:react/recommended',
    ],
    globals: {
        Audio: true,
        Element: true,
        Event: true,
        fin: true,
        localStorage: true,
    },
    parser: 'babel-eslint',
    plugins: [
        'babel',
        'react',
    ],
    rules: {
        'arrow-parens': ['error', 'as-needed'],
        'babel/semi': ['error', 'never'],
        'import/newline-after-import': [
            'error', {
                count: 2,
            }],
        'import/no-unresolved': "off",
        'import/order': "error",
        'import/prefer-default-export': "error",
        'import/no-unambiguous': "off",
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'no-multiple-empty-lines': ['error', {
            max: 2,
        }],
        'operator-linebreak': ['error', 'before'],
        'padded-blocks': 'off',
        quotes: [2, 'single'],
        'react/jsx-no-bind': 'error',
        'react/no-find-dom-node': 'warn',
        'react/sort-comp': [1, {order: [
            'static-methods',
            'lifecycle',
            'everything-else',
            '/^on.+$/',
            'render',
        ]}],
        'sort-keys': ['error', 'asc', {
            caseSensitive: false,
            natural: false,
        }],
        'space-before-function-paren':  'off'
    }
}
