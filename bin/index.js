#!/usr/bin/env node

const spawn = require('cross-spawn')


const script = process.argv.length > 1
    ? process.argv[2]
    : undefined

switch(script) {

    case 'build':
        const result = spawn.sync(
            'node',
            [require.resolve(`../scripts/${script}.js`)],
            { stdio: 'inherit' }
        )
        process.exit(result.status || 1)
        break

    default:
        console.log('Oops')
        process.exit(1)
}
