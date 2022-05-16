import Pet from "../data/petMongoSchema.js";

async function createPet(pet) {
  const newPet = await Pet.create(pet);
  return newPet;
}

async function getAllPets(queries) {
  const { type, height, weight, name, adoptionStatus, page } = queries;
  const queryObject = { page };
  if (type && type !== "All") {
    queryObject.type = type;
  }
  if (adoptionStatus && adoptionStatus !== "All") {
    queryObject.adoptionStatus = adoptionStatus;
  }
  if (height) {
    queryObject.height = height;
  }
  if (weight) {
    queryObject.weight = weight;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Pet.find(queryObject);
  // const page = Number(queries.page) || 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  result.skip(skip).limit(limit);
  const allPets = await result;
  const totalPets = await Pet.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPets / limit);
  return { allPets, totalPets, numOfPages };
}

async function findPetById(id) {
  const pet = await Pet.findById(id);
  return pet;
}

async function findPetByIdAndUpdate(id, update) {
  const petToEdit = await Pet.findOneAndUpdate({ _id: id }, update, {
    returnOriginal: false,
    runValidators: true,
  });
  return petToEdit;
}

export default { createPet, getAllPets, findPetById, findPetByIdAndUpdate };
