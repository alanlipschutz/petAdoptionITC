import { StatusCodes } from "http-status-codes";
import petsModel from "../Models/petsModel.js";
import fs from "fs";
//cloudinary
import { v2 as cloudinary } from "cloudinary";
import userModel from "../Models/userModel.js";

async function addPet(req, res, next) {
  const result = await cloudinary.uploader.upload(req.file.path);
  const petToCreate = {
    ...req.body,
    createdBy: req.user.userId,
    picture: result.secure_url,
  };
  fs.promises.unlink(req.file.path);
  const pet = await petsModel.createPet(petToCreate);
  res.status(StatusCodes.CREATED).json({ pet });
}

async function getPet(req, res, next) {
  const pet = await petsModel.findPetById(req.params.id);
  res.status(StatusCodes.OK).json({ pet });
}

async function editPet(req, res, next) {
  let update = {};
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    update = { ...req.body, picture: result.secure_url };
  } else {
    update = { ...req.body };
  }
  const petToEdit = await petsModel.findPetByIdAndUpdate(req.params.id, update);
  req.file && fs.promises.unlink(req.file.path);
  res.status(StatusCodes.OK).json({ petToEdit });
}
async function getPets(req, res, next) {
  const { allPets, totalPets, numOfPages } = await petsModel.getAllPets(
    req.query
  );
  res.status(StatusCodes.OK).json({ allPets, totalPets, numOfPages });
}
async function addPetToUser(req, res, next) {
  const petId = req.params;
  const userId = req.user;
  const user = await userModel.adoptOrFosterPet(userId, petId, req.body);
  res.status(StatusCodes.CREATED).json({ user });
}
async function returnPet(req, res, next) {
  const petId = req.params;
  const userId = req.user;
  const user = await userModel.returnPet(userId, petId);
  res.status(StatusCodes.OK).json({ user });
}
async function savePet(req, res, next) {
  const petId = req.params;
  const userId = req.user;
  const user = await userModel.savePet(userId, petId);
  res.status(StatusCodes.OK).json({ user });
}
async function deletePet(req, res, next) {
  const petId = req.params;
  const userId = req.user;
  const user = await userModel.deleteSavedPet(userId, petId);
  res.status(StatusCodes.OK).json({ user });
}
async function getPetsByUserId(req, res, next) {
  const { id } = req.params;
  const { requestedPet } = req.query;
  const pets = await userModel.getPetsOfUserId(id, requestedPet);
  res.status(StatusCodes.OK).json({ pets });
}

export default {
  addPet,
  getPet,
  editPet,
  getPets,
  addPetToUser,
  returnPet,
  savePet,
  deletePet,
  getPetsByUserId,
};
