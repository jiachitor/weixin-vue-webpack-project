var path = require('path'),
  os = require('os'),
  co = require('co'),
  domain = require('domain'),
  open = require('open'),
  webpack = require('webpack'),
  webpackDevServer = require('webpack-dev-server'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

// 建立错误监听程序
var serverDomain = domain.create();

var webpackConfig = require('./webpack.config.js');

var IPV4, PORT = 8080,
  argv = process.argv.slice(2);

function getLocalIP() {
  var map = [];
  var ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    if (dev.indexOf('本地连接') != -1 || dev.indexOf('无线网络连接') != -1) {
      return ifaces[dev][1].address;
    }
  }
  return map;
}

IPV4 = getLocalIP();

co(function*() {
  // yield any promise
  //PORT = yield getUsablePort();

  var config = {
    host: 'http://' + IPV4,
    _host_: IPV4,
  };

  if (argv[0] === '--production') {
    // 生产环境下
    webpackConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  } else {
    // 开发环境下
    webpackConfig.devtool = '#source-map'
  }

  var server;

  function createServer(_port) {
    webpackConfig.entry.app.unshift("webpack-dev-server/client?" + config.host + ":" + _port);
    webpackConfig.entry.app.unshift("webpack/hot/dev-server");

    var compiler = webpack(webpackConfig);
    server = new webpackDevServer(compiler, {
      host: config.host,
      port: _port,
      contentBase: "src/", //指定访问目录
      hot: true,
      inline: true,
      quiet: false,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
      //publicPath: config_appName + "/static/", //这个应该是必须的，对应到页面引用js资源的目录，但是没有生成真实的js文件
      publicPath: config.host + ":" + _port + "/" + config_appName + "/static/", //这个应该是必须的，对应到页面引用js资源的目录，但是没有生成真实的js文件
      headers: {
        "X-Custom-Header": "yes"
      },
      stats: {
        colors: true
      },
    });

    server.listen(_port, config._host_, function() {
      console.log(config.host + ":" + _port + "/" + config_appName + "/");
      open(config.host + ":" + _port + "/" + config_appName + "/");
    });
  }

  serverDomain.run(function() {
    createServer(PORT);
  });

  serverDomain.on('error', function(err) {
    server.close();
    PORT = PORT + 1;
    createServer(PORT);
  });

}).catch(onerror);

// errors can be try/catched
co(function*() {
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error(err.message); // "boom"
  }
}).catch(onerror);

function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}