require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

// MongodDB
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(compression());

// Routes
require('./routes/demoRoutes')(app);

// devServer (catch all)
require('./config/devServer')(app);

// production (catch all)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} in ${process.env.NODE_ENV}`);
});
