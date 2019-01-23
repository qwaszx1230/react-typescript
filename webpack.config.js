var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const target = '';
var port = 8081;
var proxy = {
    "/api/*": {
        changeOrigin: true,
        target: target,
        secure: false
    },
    "/common/api/*": {
        target: target,
        secure: false
    }
}
var is_local = process.env.NODE_ENV === 'local';
var is_dev = process.env.NODE_ENV === 'development' || is_local;

var plugins = [
    new webpack.ProvidePlugin({ "joint": "jointjs" }),
    //它将从每一个用到了require("app.css")的entry chunks文件中抽离出css到单独的output文件
    new ExtractTextPlugin('[name].less?[contenthash]'),
    new HtmlWebpackPlugin({
        favicon: './favicon.ico', //favicon路径
        filename: '../index.html',
        template: "./src/index.html",
        inject: true,
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    })
];
if (is_dev) {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            "RemoveMasterPage": is_local
        }
    }));
    proxy = {
        "/api/*": {
            changeOrigin: true,
            target: target,
            secure: false
        },
        "/common/api/*": {
            target: target,
            secure: false
        }
    }
} else {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ch/));
}

module.exports = {
    entry: {
        //已多次提及的唯一入口文件
        app: ['./src/app']
    },
    output: {
        path: "/",
        publicPath: 'https://127.0.0.1:' + port + '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devtool: 'source-map',
    devServer: {
        headers: {"Access-Control-Allow-Origin": "*"},
        proxy: proxy,
        // compress: true,
        host: '0.0.0.0',
        port: port,
        https: true
    },
    module: {
        rules: [
            {
                test: /\.tsx|\.ts$/,
                exclude: /^node_modules$/,
                use: 'awesome-typescript-loader'
            }, {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: 'url-loader?limit=50000&name=[path][name].[ext]'
            }, {
                test: /\.less|\.css$/,
                exclude: /^node_modules$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: [
            '.js', '.jsx', '.ts', '.tsx'
        ],
        alias: {
            "react-router": "react-router/umd/ReactRouter.min.js",
            'jointjs': 'jointjs/dist/joint.min'
        },
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    externals: []
};
