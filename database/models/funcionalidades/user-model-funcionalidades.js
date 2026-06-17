const User = require("../definitions/user");

async function createUserDb({ email, password }) {
  const user = await User.create({
    email,
    password,
  });

  return user;
}

async function findUserByEmailDb({ email }) {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user;
}

async function findAllUsersDb() {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });

  return users;
}

async function findUserByIdWithoutPasswordDb({ id }) {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });

  return user;
}

async function updateUserDb({ id, email, password }) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  user.email = email;
  user.password = password;

  await user.save();

  return user;
}

async function deleteUserDb({ id }) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.destroy();

  return true;
}

module.exports = {
  createUserDb,
  findUserByEmailDb,
  findAllUsersDb,
  findUserByIdWithoutPasswordDb,
  updateUserDb,
  deleteUserDb,
};