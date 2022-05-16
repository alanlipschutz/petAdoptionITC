import bcrypt from "bcryptjs";
import { BadRequestError, UnAuthenticatedError } from "../Errors/index.js";
import authModel from "../Models/authModel.js";

async function checkIfPasswordsEqual(req, res, next) {
  if (req.body.pwd !== req.body.confirmPwd) {
    throw new BadRequestError("Password doesn't match");
  }
  next();
}

async function checkIfPasswordMatch(req, res, next) {
  const user = await authModel.findUserLogIn(req.body);
  const isMatch = await bcrypt.compare(req.body.pwd, user.pwd);
  if (!user) {
    throw new UnAuthenticatedError("Wrong Credentials");
  }
  if (!isMatch) {
    throw new UnAuthenticatedError("Wrong Credentials");
  }
  next();
}

export { checkIfPasswordsEqual, checkIfPasswordMatch };
