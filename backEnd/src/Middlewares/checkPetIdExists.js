import { NotFoundError } from "../Errors/index.js";
import petsModel from "../Models/petsModel.js";

async function ifPetIdExists(req, res, next) {
  const { id } = req.params;
  const pet = await petsModel.findPetById(id);
  if (!pet) {
    throw new NotFoundError(`No Pet with id: ${id}`);
  }
  next();
}

export default ifPetIdExists;
