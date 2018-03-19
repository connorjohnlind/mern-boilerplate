require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressStaticGzip = require("express-static-gzip");

// MongodDB
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Dev Server
const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  const webpack = require("webpack");
  const config = require("../webpack.config.dev.js");
  const compiler = webpack(config);

  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
  );

  const webpackHotMiddlware = require("webpack-hot-middleware")(
    compiler,
    config.devServer
  );

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  console.log("Middleware enabled");
}

// Middleware
app.use(bodyParser.json());
app.use(expressStaticGzip("dist", {
  enableBrotli: true
}));

// Routes
require('./routes/authRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} in ${process.env.NODE_ENV}`);
})
