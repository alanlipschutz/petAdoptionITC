const registerUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    pwd: { type: "string" },
    confirmPwd: { type: "string" },
    phoneNumber: { type: "string" },
  },
  required: ["name", "lastName", "email", "pwd", "confirmPwd", "phoneNumber"],
  additionalProperties: false,
};

const logInUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    pwd: { type: "string" },
  },
  required: ["email", "pwd"],
  additionalProperties: false,
};

const UpdateUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    lastName: { type: "string" },
    pwd: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    bio: { type: "string" },
  },
  required: ["name", "lastName", "email", "phoneNumber"],
  additionalProperties: false,
};

export { registerUserSchema, logInUserSchema, UpdateUserSchema };
