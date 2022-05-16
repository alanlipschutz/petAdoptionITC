import BadRequestError from "../Errors/bad-request.js";
import authModel from "../Models/authModel.js";
import petsModel from "../Models/petsModel.js";

async function hasThisPetSaved(req, res, next) {
  const { id } = req.params;
  const user = await authModel.findUserById(req.user.userId);
  const { savedPets } = user;
  const petExist = savedPets.find((petId) => petId.toString() === id);
  if (petExist) {
    throw new BadRequestError("You already have this pet saved");
  }
  next();
}

async function hasThisPetOwned(req, res, next) {
  const { id } = req.params;
  const user = await authModel.findUserById(req.user.userId);
  const { ownedPets } = user;
  const pet = await petsModel.findPetById(id);
  const petExist = ownedPets.find((petId) => petId.toString() === id);
  if (pet.adoptionStatus === "Fostered") {
    if (!petExist) {
      throw new BadRequestError("You are not fostering this pet");
    }
  }
  next();
}

async function notOwnedThisPet(req, res, next) {
  const { id } = req.params;
  const user = await authModel.findUserById(req.user.userId);
  const { ownedPets } = user;
  const petExist = ownedPets.find((petId) => petId.toString() === id);
  if (!petExist) {
    throw new BadRequestError("You don't own this pet");
  }
  next();
}

export { hasThisPetSaved, hasThisPetOwned, notOwnedThisPet };
