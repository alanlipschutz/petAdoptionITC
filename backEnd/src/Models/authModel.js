import User from "../data/userSchema.js";

async function createUser(user) {
  const newUser = User.create(user);
  return newUser;
}
async function findUserLogIn(user) {
  const { email } = user;
  const credentials = await User.findOne({ email }).select("+pwd");
  return credentials;
}
async function findUserByUserIdAndUpdate(user, update) {
  const { userId } = user;
  const userToUpdate = await User.findOneAndUpdate({ _id: userId }, update, {
    runValidators: true,
    new: true,
  });
  return userToUpdate;
}
async function findUserByEmail(user) {
  const { email } = user;
  const userAlreadyExists = await User.findOne({ email });
  return userAlreadyExists;
}

async function findUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function findAllUsers() {
  const allUsers = await User.find({});
  return allUsers;
}

export default {
  createUser,
  findUserByEmail,
  findUserLogIn,
  findUserByUserIdAndUpdate,
  findUserById,
  findAllUsers,
};
