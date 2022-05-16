import express from "express";
import userController from "../Controllers/userController.js";
import isAuth from "../Middlewares/Auth.js";
import isAdmin from "../Middlewares/checkIsAdmin.js";
const router = express.Router();

router.get("/user/:id", isAuth, isAdmin, userController.getUserID);
router.get("/user", isAuth, isAdmin, userController.getUsers);
router.get("/user/:id/full", isAuth, isAdmin, userController.getUserDetails);

export default router;
