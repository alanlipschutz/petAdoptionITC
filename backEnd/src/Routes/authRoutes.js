import express from "express";
import authController from "../Controllers/authController.js";
import {
  checkIfFieldsAreComplete,
  checkifLoginFieldsAreComplete,
  checkUpdateFieldsUserComplete,
} from "../Middlewares/checkFieldsComplete.js";
import {
  ifUserExists,
  logInInexistentUser,
} from "../Middlewares/checkIfUserExist.js";
import {
  checkIfPasswordMatch,
  checkIfPasswordsEqual,
} from "../Middlewares/checkConfirmPwd.js";
import encryptPassword from "../Middlewares/encryptPassword.js";
import isAuth from "../Middlewares/Auth.js";
const router = express.Router();

router.post(
  "/signup",
  checkIfFieldsAreComplete,
  ifUserExists,
  checkIfPasswordsEqual,
  encryptPassword,
  authController.handleSignUp
);
router.post(
  "/login",
  checkifLoginFieldsAreComplete,
  logInInexistentUser,
  checkIfPasswordMatch,
  authController.handleLogIn
);
router.put(
  "/user/:id",
  isAuth,
  checkUpdateFieldsUserComplete,
  encryptPassword,
  authController.updateUser
);

export default router;
