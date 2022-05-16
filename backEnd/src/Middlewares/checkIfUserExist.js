import authModel from "../Models/authModel.js";
import { BadRequestError } from "../Errors/index.js";

async function ifUserExists(req, res, next) {
  const userAlreadyExists = await authModel.findUserByEmail(req.body);
  if (userAlreadyExists) {
    throw new BadRequestError("user already exists");
  }
  next();
}

async function logInInexistentUser(req, res, next) {
  const potencialUser = await authModel.findUserByEmail(req.body);
  if (!potencialUser) {
    throw new BadRequestError("User doesn't exist");
  }
  next();
}

export { ifUserExists, logInInexistentUser };
