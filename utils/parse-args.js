const fp = require('lodash/fp')


module.exports = fp.flow(
    fp.nth(2),
    fp.split(','),
    fp.chunk(2),
    fp.fromPairs,
    fp.mapKeys(key => key.replace(/-/g, ''))
)
