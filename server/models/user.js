const _ = require('lodash');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});

/* ----- Instance Methods ------ */

// filter out sensitive data on JSON response
UserSchema.methods.toJSON = function toJSON() {
  const user = this;
  const userObject = user.toObject(); // make into JS object for lodash
  return _.pick(userObject, ['_id', 'email']);
};

// add a JWT to the instance of User
UserSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access,
  }, process.env.JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  await user.save();
  return token;
};

UserSchema.methods.removeToken = function removeToken(token) {
  const user = this;
  return user.update({ $pull: { tokens: { token } } });
};

/* -------- Model Methods --------- */

// find a user by a given JWT
UserSchema.statics.findByToken = function findByToken(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

// find a user by a given email and password
UserSchema.statics.findByCredentials = function findByCredentials(email, password) {
  const User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare given password and stored .password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

/* -------- Middleware --------- */

UserSchema.pre('save', function hashPass(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


const User = mongoose.model('User', UserSchema);

module.exports = { User };
