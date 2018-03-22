const path = require('path');

module.exports = (app) => {
  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack'); // eslint-disable-line global-require
    const config = require('../../webpack.config.dev.js'); // eslint-disable-line global-require
    const compiler = webpack(config);

    const webpackDevMiddleware = require('webpack-dev-middleware')( // eslint-disable-line global-require
      compiler,
      config.devServer,
    );

    const webpackHotMiddlware = require('webpack-hot-middleware')( // eslint-disable-line global-require
      compiler,
      config.devServer,
    );

    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddlware);

    app.use('/*', (req, res, next) => {
      const filename = path.join(compiler.outputPath, 'index.html');
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
          return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      });
    });

    console.log('Dev Server middleware enabled');
  }
};
