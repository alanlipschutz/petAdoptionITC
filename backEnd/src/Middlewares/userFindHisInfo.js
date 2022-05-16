import { UnAuthenticatedError } from "../Errors/index.js";

async function isUserIdEqualsMyPetsId(req, res, next) {
  const pageId = req.params.id;
  const userId = req.user.userId;
  if (pageId !== userId) {
    throw new UnAuthenticatedError("AUTH ERROR");
  }
  next();
}

export { isUserIdEqualsMyPetsId };
