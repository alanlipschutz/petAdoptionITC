import { StatusCodes } from "http-status-codes";
import authModel from "../Models/authModel.js";
import userModel from "../Models/userModel.js";

async function getUserID(req, res, next) {
  const user = await authModel.findUserById(req.params.id);
  res.status(StatusCodes.OK).json({ user });
}
async function getUsers(req, res, next) {
  const allUsers = await authModel.findAllUsers();
  res.status(StatusCodes.OK).json({ allUsers });
}
async function getUserDetails(req, res, next) {
  const userFound = await authModel.findUserById(req.params.id);
  const pets = await userModel.getAllPetsOfUserId(req.params.id);
  const user = { userFound, pets };
  res.status(StatusCodes.OK).json({ user });
}

export default { getUserID, getUsers, getUserDetails };
