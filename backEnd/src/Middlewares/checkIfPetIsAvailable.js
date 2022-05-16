import { BadRequestError } from "../Errors/index.js";
import petsModel from "../Models/petsModel.js";

async function isPetAvailable(req, res, next) {
  const { id } = req.params;
  const pet = await petsModel.findPetById(id);
  if (pet.adoptionStatus === "Adopted") {
    throw new BadRequestError("This pet is not available");
  }
  next();
}

export { isPetAvailable };
