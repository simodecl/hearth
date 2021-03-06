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
    // pages: {
    //     index: {
    //       entry: './client/src/main.js',
    //       template: './client/public/index.html',
    //       filename: 'index.html',
    //     },
    // },
    outputDir: './client/dist',
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://hearthapp.herokuapp.com',
                changeOrigin: true
            }
        }
     },
     css: {
        loaderOptions: {
            sass: {
                data: '@import "public/assets/scss/global.scss";'
            }
        }
    },
}