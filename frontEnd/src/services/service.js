import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://adopcy-server.herokuapp.com"
      : "http://localhost:8080",
  withCredentials: true,
});

async function signUp(currentUser) {
  const response = await api.post("/signup", currentUser);
  return response.data;
}

async function logIn(currentUser) {
  const response = await api.post("/login", currentUser);
  return response.data;
}

async function updateUser(valuesToUpdate) {
  const response = await api.put("/user/:id", valuesToUpdate);
  return response.data;
}

async function addPet(petToAdd) {
  await api.post("/pet", petToAdd);
}

async function getAllPets(query, page) {
  const queries = { ...query, page };
  const response = await api.get(`/pets/`, { params: queries });
  return response.data;
}

async function getPetById(id) {
  const response = await api.get(`/pets/${id}`);
  return response.data;
}

async function editPetById(id, updates) {
  await api.put(`/pets/${id}`, updates);
}

async function getAllUsers() {
  const response = await api.get("/user");
  return response.data;
}

async function getUser(id) {
  const response = await api.get(`/user/${id}/full`);
  return response.data;
}

async function savePet(petId) {
  const response = await api.post(`/pets/${petId}/save`);
  return response.data;
}

async function deletePet(petId) {
  const response = await api.delete(`/pets/${petId}/save`);
  return response.data;
}

async function adoptOrFosterPet(petId, adoptionStatus) {
  const response = await api.post(`/pets/${petId}/adopt`, adoptionStatus);
  return response.data;
}
async function returnPet(petId) {
  const response = await api.post(`/pets/${petId}/return`);
  return response.data;
}

async function getPetsByUserId(userId, requestedPets) {
  const response = await api.get(`/pets/user/${userId}/`, {
    params: requestedPets,
  });
  return response.data;
}
export {
  signUp,
  logIn,
  updateUser,
  addPet,
  getAllPets,
  getPetById,
  editPetById,
  getAllUsers,
  getUser,
  savePet,
  deletePet,
  adoptOrFosterPet,
  returnPet,
  getPetsByUserId,
};
