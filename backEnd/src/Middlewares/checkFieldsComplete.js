import Ajv from "ajv";
import addFormat from "ajv-formats";
import petAjvSchema from "../data/petAjvSchema.js";
import {
  logInUserSchema,
  registerUserSchema,
  UpdateUserSchema,
} from "../data/userAjvSchema.js";
import { BadRequestError } from "../Errors/index.js";

const ajv = new Ajv();
addFormat(ajv);
const validateRegistration = ajv.compile(registerUserSchema);
const validateLogIn = ajv.compile(logInUserSchema);
const validateUpdate = ajv.compile(UpdateUserSchema);
const validateAddPet = ajv.compile(petAjvSchema);

async function checkIfFieldsAreComplete(req, res, next) {
  const valid = validateRegistration(req.body);
  if (!valid) {
    throw new BadRequestError("Please, provide all the values");
  }
  next();
}

async function checkifLoginFieldsAreComplete(req, res, next) {
  const valid = validateLogIn(req.body);
  if (!valid) {
    throw new BadRequestError("Please, provide all the values");
  }
  next();
}

async function checkUpdateFieldsUserComplete(req, res, next) {
  const valid = validateUpdate(req.body);
  if (!valid) {
    throw new BadRequestError(
      "All values should be complete to update a profile"
    );
  }
  next();
}

async function checkAddPetFieldsComplete(req, res, next) {
  if (
    !req.body.type ||
    !req.body.name ||
    !req.body.adoptionStatus ||
    !req.body.height ||
    !req.body.weight ||
    !req.body.color ||
    !req.body.hypoallergenic ||
    !req.body.breed
  ) {
    throw new BadRequestError("Please, provide all the values");
  }
  next();
}

export {
  checkIfFieldsAreComplete,
  checkifLoginFieldsAreComplete,
  checkUpdateFieldsUserComplete,
  checkAddPetFieldsComplete,
};
