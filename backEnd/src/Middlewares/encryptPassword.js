import bcrypt from "bcryptjs";

async function encryptPassword(req, res, next) {
  try {
    if (req.body.pwd) {
      const salt = await bcrypt.genSalt(10);
      req.body.pwd = await bcrypt.hash(req.body.pwd, salt);
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}

export default encryptPassword;
