#!/usr/bin/env node

const spawn = require('cross-spawn')


const script = process.argv.length > 1
    ? process.argv[2]
    : undefined

switch(script) {

    case 'build':
    case 'start':
    case 'test':
        const result = spawn.sync(
            'node',
            [require.resolve(`../scripts/${script}.js`), process.argv.slice(3)],
            { stdio: 'inherit' }
        )
        process.exit(result.status)
        break

    default:
        console.log('Oops')
        process.exit(1)
}
