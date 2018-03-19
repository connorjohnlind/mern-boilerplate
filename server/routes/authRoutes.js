const _ = require('lodash');

const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

module.exports = (app) => {
  app.post('/auth/login', async (req, res) => {
    try {
      const body = _.pick(req.body, ['email', 'password']);
      const user = await User.findByCredentials(body.email, body.password);
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send();
    }
  });

  app.post('/auth/renew', authenticate, (req, res) => {
    res.send(req.user);
  });
};
