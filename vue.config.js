module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': __dirname + '/client/src'
            }
        },
        entry: {
            app: './client/src/main.js'
        }
    },
}