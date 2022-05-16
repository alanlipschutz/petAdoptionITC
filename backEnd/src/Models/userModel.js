import User from "../data/userSchema.js";
import Pet from "../data/petMongoSchema.js";

async function savePet(idUser, idPet) {
  const { userId } = idUser;
  const { id } = idPet;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { savedPets: id } },
    { new: true, runValidators: true }
  );
  return user;
}

async function deleteSavedPet(idUser, idPet) {
  const { userId } = idUser;
  const { id } = idPet;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { savedPets: { $in: [id] } } },
    { new: true, runValidators: true }
  );
  return user;
}

async function adoptOrFosterPet(idUser, idPet, update) {
  const { userId } = idUser;
  const { id } = idPet;
  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { ownedPets: { $in: [id] } } },
    { new: true, runValidators: true }
  );
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { ownedPets: id } },
    { new: true, runValidators: true }
  );
  const pet = await Pet.findOneAndUpdate(
    { _id: id },
    { $set: update },
    { new: true, runValidators: true }
  );
  return user;
}

async function returnPet(idUser, idPet) {
  const { userId } = idUser;
  const { id } = idPet;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { ownedPets: { $in: [id] } } },
    { new: true, runValidators: true }
  );
  const pet = await Pet.findOneAndUpdate(
    { _id: id },
    { $set: { adoptionStatus: "Available" } },
    { new: true, runValidators: true }
  );
  return user;
}

async function getPetsOfUserId(userId, requestedPet) {
  const user = await User.findOne({ _id: userId });
  const { savedPets, ownedPets } = user;
  let pets;
  if (requestedPet === "savedPets") {
    pets = await Pet.find({ _id: { $in: savedPets } });
  } else {
    pets = await Pet.find({ _id: { $in: ownedPets } });
  }
  return pets;
}

async function getAllPetsOfUserId(userId) {
  const user = await User.findOne({ _id: userId });
  const { ownedPets } = user;
  const owned = await Pet.find({ _id: { $in: ownedPets } });
  const pets = [...owned];
  return pets;
}

export default {
  savePet,
  deleteSavedPet,
  adoptOrFosterPet,
  returnPet,
  getPetsOfUserId,
  getAllPetsOfUserId,
};
