// Dependencies
const { ServerError } = require('../helpers/server_error');
const User = require('../models/User');

function findOne (filter = {}, projections = {}) {
  return User.findOne(filter, projections).exec();
}

async function create (userData) {
  const newUser = new User(userData);

  try {
    await newUser.validate();
    return newUser.save();
  } catch (validateError) {
    throw new ServerError(validateError, 400);
  }
}

async function findOrCreate (query, data) {
  let user = await User.findOne(query).exec();

  if (user) {
    return user;
  } else {
    user = await create(data);
  }

  return user;
}

module.exports = {
  findOne,
  create,
  findOrCreate,
};
