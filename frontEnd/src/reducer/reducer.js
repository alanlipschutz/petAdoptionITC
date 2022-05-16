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
} from "./actions";

function reducer(state, action) {
  if (action.type === OPEN_MODAL) {
    return {
      ...state,
      showModal: true,
    };
  }
  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      showModal: false,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      activeUser: action.payload.userToSend,
      showModal: false,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      activeUser: null,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      activeUser: action.payload.userToUpdate,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile changed",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      type: "dog",
      name: "",
      adoptionStatus: "Available",
      picture: "",
      height: "",
      weight: "",
      color: "",
      bio: "",
      hypoallergenic: "no",
      dietaryRestrictions: "",
      breed: "",
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_PET_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === CREATE_PET_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Pet Created!",
    };
  }
  if (action.type === CREATE_PET_ERROR) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_PETS_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
      listOfPets: [],
    };
  }
  if (action.type === GET_PETS_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      listOfPets: action.payload.allPets,
    };
  }
  if (action.type === SET_EDIT_PET) {
    const petToEdit = state.listOfPets.find(
      (pet) => pet._id === action.payload.id
    );
    const {
      _id,
      type,
      name,
      adoptionStatus,
      picture,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    } = petToEdit;
    return {
      ...state,
      isEditing: true,
      editPetId: _id,
      type,
      name,
      adoptionStatus,
      picture,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    };
  }
  if (action.type === EDIT_PET_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === EDIT_PET_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Updated!",
    };
  }
  if (action.type === EDIT_PET_ERROR) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SAVE_PET_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === SAVE_PET_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      activeUser: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Saved!",
    };
  }
  if (action.type === SAVE_PET_ERROR) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_PET_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === DELETE_PET_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      activeUser: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Pet deleted!",
    };
  }
  if (action.type === OWN_PET_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === OWN_PET_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      activeUser: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Owned!",
    };
  }
  if (action.type === OWN_PET_ERROR) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === RETURN_PET_BEGIN) {
    return {
      ...state,
      isAuthLoading: true,
    };
  }
  if (action.type === RETURN_PET_SUCCESS) {
    return {
      ...state,
      isAuthLoading: false,
      activeUser: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Returned!",
    };
  }
  if (action.type === RETURN_PET_ERROR) {
    return {
      ...state,
      isAuthLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
}

export default reducer;
