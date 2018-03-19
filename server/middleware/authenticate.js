const _ = require('lodash');
const { User } = require('./../models/user');

const authenticate = async (req, res, next) => { // eslint-disable-line consistent-return
  try {
    const { token } = _.pick(req.body, ['token']);
    const user = await User.findByToken(token);
    if (!user) return Promise.reject();
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

module.exports = { authenticate };
