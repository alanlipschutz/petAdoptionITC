import React, { useReducer } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  OPEN_MODAL,
  CLOSE_MODAL,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_PET_BEGIN,
  CREATE_PET_SUCCESS,
  CREATE_PET_ERROR,
  GET_PETS_BEGIN,
  GET_PETS_SUCCESS,
  SET_EDIT_PET,
  EDIT_PET_BEGIN,
  EDIT_PET_SUCCESS,
  EDIT_PET_ERROR,
  SAVE_PET_BEGIN,
  SAVE_PET_SUCCESS,
  SAVE_PET_ERROR,
  DELETE_PET_BEGIN,
  DELETE_PET_SUCCESS,
  OWN_PET_BEGIN,
  OWN_PET_SUCCESS,
  OWN_PET_ERROR,
  RETURN_PET_BEGIN,
  RETURN_PET_SUCCESS,
  RETURN_PET_ERROR,
} from "../../reducer/actions";
import AuthContext from "../../contexts/AuthContext.js";
import reducer from "../../reducer/reducer";
import { useNavigate } from "react-router-dom";
import {
  logIn,
  signUp,
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
} from "../../services/service.js";

const localStorageUser = localStorage.getItem("user");
const initialState = {
  isAuthLoading: false,
  showAlert: false,
  showModal: false,
  alertText: "",
  alertType: "",
  activeUser: localStorageUser ? JSON.parse(localStorageUser) : null,
  isEditing: false,
  editPetId: "",
  typeOptions: ["dog", "cat"],
  type: "dog",
  name: "",
  adoptionStatusOptions: ["Adopted", "Fostered", "Available"],
  adoptionStatus: "Available",
  picture: "",
  height: "",
  weight: "",
  color: "",
  bio: "",
  hypoallergenicOptions: ["no", "yes"],
  hypoallergenic: "no",
  dietaryRestrictions: "",
  breed: "",
  listOfPets: [],
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  function openModal() {
    dispatch({ type: OPEN_MODAL });
  }

  function closeModal() {
    dispatch({ type: CLOSE_MODAL });
  }

  function displayAlert() {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }
  function clearAlert() {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  }

  async function handleSignUp(currentUser) {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { userToSend } = await signUp(currentUser);
      dispatch({ type: SETUP_USER_SUCCESS, payload: { userToSend } });
      addUserToLocalStorage(userToSend);
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  }

  async function handleLogin(currentUser) {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { userToSend } = await logIn(currentUser);
      dispatch({ type: SETUP_USER_SUCCESS, payload: { userToSend } });
      addUserToLocalStorage(userToSend);
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function handleUpdateUser(valuesToUpdate) {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { userToUpdate } = await updateUser(valuesToUpdate);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { userToUpdate } });
      addUserToLocalStorage(userToUpdate);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function handleLogOut() {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
    navigate("/");
  }

  function addUserToLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function removeUserFromLocalStorage() {
    localStorage.removeItem("user");
  }

  function handleChangePetInputs({ name, value }) {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  }

  function clearValues() {
    dispatch({ type: CLEAR_VALUES });
  }

  async function handleAddPet(file) {
    dispatch({ type: CREATE_PET_BEGIN });
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("type", state.type);
    formData.append("adoptionStatus", state.adoptionStatus);
    formData.append("picture", file.current.files[0]);
    formData.append("height", state.height);
    formData.append("weight", state.weight);
    formData.append("color", state.color);
    formData.append("bio", state.bio);
    formData.append("hypoallergenic", state.hypoallergenic);
    formData.append("dietaryRestrictions", state.dietaryRestrictions);
    formData.append("breed", state.breed);
    try {
      await addPet(formData);
      dispatch({ type: CREATE_PET_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function handleGetAllPets(queries, wantedPage) {
    dispatch({ type: GET_PETS_BEGIN });
    try {
      const { allPets, totalPets, numOfPages } = await getAllPets(
        queries,
        wantedPage
      );
      dispatch({ type: GET_PETS_SUCCESS, payload: { allPets } });
      return { allPets, totalPets, numOfPages };
    } catch (error) {
      console.log(error.message);
      handleLogOut();
    }
  }

  async function handleGetPetById(id) {
    try {
      const pet = await getPetById(id);
      return pet;
    } catch (error) {
      console.log(error);
    }
  }

  function setEditPet(id) {
    dispatch({ type: SET_EDIT_PET, payload: { id } });
  }

  async function handleEditPetById(file) {
    dispatch({ type: EDIT_PET_BEGIN });
    let fileData;
    file.current.files.length !== 0
      ? (fileData = file.current.files[0])
      : (fileData = state.picture);
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("type", state.type);
    formData.append("adoptionStatus", state.adoptionStatus);
    formData.append("picture", fileData);
    formData.append("height", state.height);
    formData.append("weight", state.weight);
    formData.append("color", state.color);
    formData.append("bio", state.bio);
    formData.append("hypoallergenic", state.hypoallergenic);
    formData.append("dietaryRestrictions", state.dietaryRestrictions);
    formData.append("breed", state.breed);
    try {
      await editPetById(state.editPetId, formData);
      dispatch({ type: EDIT_PET_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function handleGetAllUsers() {
    try {
      const { allUsers } = await getAllUsers();
      return allUsers;
    } catch (error) {
      console.log(error);
      handleLogOut();
    }
  }

  async function handleGetUser(id) {
    try {
      const { user } = await getUser(id);
      return user;
    } catch (error) {
      console.log(error);
      handleLogOut();
    }
  }
  async function handleSavePet(id) {
    dispatch({ type: SAVE_PET_BEGIN });
    try {
      const { user } = await savePet(id);
      dispatch({ type: SAVE_PET_SUCCESS, payload: { user } });
      addUserToLocalStorage(user);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: SAVE_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }
  async function handleDeletePet(id) {
    dispatch({ type: DELETE_PET_BEGIN });
    try {
      const { user } = await deletePet(id);
      dispatch({ type: DELETE_PET_SUCCESS, payload: { user } });
      addUserToLocalStorage(user);
    } catch (error) {
      if (error.response.status === 401) return;
    }
    clearAlert();
  }

  async function handleOwnAPet(id, newAdoptionStatus) {
    dispatch({ type: OWN_PET_BEGIN });
    try {
      const newStatus = { adoptionStatus: newAdoptionStatus };
      const { user } = await adoptOrFosterPet(id, newStatus);
      dispatch({ type: OWN_PET_SUCCESS, payload: { user } });
      addUserToLocalStorage(user);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: OWN_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function handleReturnAPet(id) {
    dispatch({ type: RETURN_PET_BEGIN });
    try {
      const { user } = await returnPet(id);
      dispatch({ type: RETURN_PET_SUCCESS, payload: { user } });
      addUserToLocalStorage(user);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: RETURN_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function handleGetPetsByUserId(requestedPets) {
    try {
      const { pets } = await getPetsByUserId(
        state.activeUser._id,
        requestedPets
      );
      return pets;
    } catch (error) {
      if (error.response.status === 401) handleLogOut();
      console.log(error);
    }
  }

  return (
    <div>
      <AuthContext.Provider
        value={{
          ...state,
          onLogIn: handleLogin,
          onSignUp: handleSignUp,
          onLogOut: handleLogOut,
          onOpenModal: openModal,
          onCloseModal: closeModal,
          displayAlert,
          onUpdate: handleUpdateUser,
          onChangePetInput: handleChangePetInputs,
          clearValues,
          onAddPet: handleAddPet,
          onGetAllPets: handleGetAllPets,
          onGetPetById: handleGetPetById,
          setEditPet,
          onEditPet: handleEditPetById,
          onGetAllUsers: handleGetAllUsers,
          onGetUser: handleGetUser,
          onSavePet: handleSavePet,
          onDeletePet: handleDeletePet,
          onOwnPet: handleOwnAPet,
          onReturnPet: handleReturnAPet,
          onGetsMyPets: handleGetPetsByUserId,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default AuthProvider;
