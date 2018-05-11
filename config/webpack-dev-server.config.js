
module.exports = ({ host }) => {

    return {
        // clientLogLevel: 'none',
        disableHostCheck: true,
        host,
        hot: true,
        // quiet: true,
        stats: {
            children: false
        }
    }
}
