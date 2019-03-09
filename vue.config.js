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
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
                changeOrigin: true
            }
        }
     }  
}