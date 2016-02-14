var path = require('path'),
    webpack = require('webpack');

var vue = require('vue-loader'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, "src", config_appName, "js", "app.js")
        ],
        vendor: ["vue", "vue-router", "vue-resource", "es6-promise"],
    },
    output: {
        path: path.resolve(__dirname, "src", config_appName, "static"),
        filename: '[name].bundle.js',
        publicPath: "./static/"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("app.bundle.css")
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        alias: {
            "node_modules": path.join(__dirname, "node_modules/"),
            "_actions": path.join(__dirname, "src/" + config_appName + "/js/actions"),
            "_common": path.join(__dirname, "src/" + config_appName + "/js/common"),
            "_components": path.join(__dirname, "src/" + config_appName + "/js/components"),
            "_filters": path.join(__dirname, "src/" + config_appName + "/js/filters"),
            "_data": path.join(__dirname, "src/" + config_appName + "/js/data"),
            "_stores": path.join(__dirname, "src/" + config_appName + "/js/stores"),
            "_templates": path.join(__dirname, "src/" + config_appName + "/js/templates"),
            "_ui": path.join(__dirname, "src/" + config_appName + "/js/ui"),
            "_utils": path.join(__dirname, "src/" + config_appName + "/js/utils"),
            '_sass': path.join(__dirname, "src/" + config_appName + "/sass"),
            '_assets': path.join(__dirname, "src/" + config_appName + "/assets"),
        },
        root: [
            path.join(__dirname, "")
        ]
    },
    module: {
        loaders: [{
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }, {
                test: /\.css$/,
                loaders: ["style", "css", "sass"]
            }, 
            // {
            //     test: /\.scss$/,
            //     loaders: ["style", "css", "sass"]
            // },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css!sass!autoprefixer")
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};
