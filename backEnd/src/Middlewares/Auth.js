import { UnAuthenticatedError } from "../Errors/index.js";
import jwt from "jsonwebtoken";

function isAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
}

export default isAuth;
