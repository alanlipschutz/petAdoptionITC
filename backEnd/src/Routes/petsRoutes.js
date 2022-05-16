import express from "express";
//multer
import multer from "multer";
import petsController from "../Controllers/petsController.js";
import { checkAddPetFieldsComplete } from "../Middlewares/checkFieldsComplete.js";
import isAuth from "../Middlewares/Auth.js";
import isAdmin from "../Middlewares/checkIsAdmin.js";
import ifPetIdExists from "../Middlewares/checkPetIdExists.js";
import {
  hasThisPetOwned,
  hasThisPetSaved,
  notOwnedThisPet,
} from "../Middlewares/userHasAPet.js";
import { isPetAvailable } from "../Middlewares/checkIfPetIsAvailable.js";
import { isUserIdEqualsMyPetsId } from "../Middlewares/userFindHisInfo.js";
import "dotenv/config.js";

const router = express.Router();
const upload = multer({ dest: process.env.PICTURE_FOLDER + "/" });

router.post(
  "/pet",
  upload.single("picture"),
  isAuth,
  isAdmin,
  checkAddPetFieldsComplete,
  petsController.addPet
); //protected. Just Admin can do things here
router
  .route("/pets/:id")
  .get(petsController.getPet)
  .put(
    upload.single("picture"),
    isAuth,
    isAdmin,
    ifPetIdExists,
    checkAddPetFieldsComplete,
    petsController.editPet
  );

router.get("/pets", petsController.getPets);

router.post(
  "/pets/:id/adopt",
  isAuth,
  ifPetIdExists,
  isPetAvailable,
  hasThisPetOwned,
  petsController.addPetToUser
); // adopt/foster a pet

router.post(
  "/pets/:id/return",
  isAuth,
  ifPetIdExists,
  notOwnedThisPet,
  petsController.returnPet
);

router
  .route("/pets/:id/save")
  .post(isAuth, ifPetIdExists, hasThisPetSaved, petsController.savePet)
  .delete(isAuth, petsController.deletePet); //delete a pet

router.get(
  "/pets/user/:id",
  isAuth,
  isUserIdEqualsMyPetsId,
  petsController.getPetsByUserId
);

export default router;
