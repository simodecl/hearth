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
    pages: {
        index: {
          entry: './client/src/main.js',
          template: './client/public/index.html',
          filename: 'index.html',
        },
    },
    outputDir: './client/dist',
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
                changeOrigin: true
            }
        }
     }  
}