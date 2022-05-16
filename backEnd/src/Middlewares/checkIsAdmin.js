import { UnAuthenticatedError } from "../Errors/index.js";
import authModel from "../Models/authModel.js";

async function isAdmin(req, res, next) {
  const isAdminUser = await authModel.findUserById(req.user.userId);
  if (!isAdminUser.isAdmin) {
    throw new UnAuthenticatedError("Not authorized to access this route");
  }
  next();
}

export default isAdmin;
