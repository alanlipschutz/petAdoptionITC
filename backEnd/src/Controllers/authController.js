import authModel from "../Models/authModel.js";
import StatusCodes from "http-status-codes";

async function handleSignUp(req, res) {
  const user = await authModel.createUser(req.body);
  const token = user.createJWT();
  const userToSend = user;
  userToSend.pwd = undefined;
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.status(StatusCodes.CREATED).json({ userToSend });
}

async function handleLogIn(req, res, next) {
  const userToSend = await authModel.findUserByEmail(req.body);
  const token = userToSend.createJWT();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.status(StatusCodes.OK).json({ userToSend });
}

async function updateUser(req, res, next) {
  const { name, lastName, email, pwd, phoneNumber, bio } = req.body;
  const update = {
    name,
    lastName,
    email,
    pwd,
    phoneNumber,
    bio,
  };
  const userToUpdate = await authModel.findUserByUserIdAndUpdate(
    req.user,
    update
  );
  const token = userToUpdate.createJWT();
  userToUpdate.pwd = undefined;
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.status(StatusCodes.OK).json({ userToUpdate });
}
export default { handleSignUp, handleLogIn, updateUser };
