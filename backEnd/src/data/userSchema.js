import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, provide a valid name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please, provide a valid lastName"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please, provide a valid email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please, provide a valid email",
    },
  },
  pwd: {
    type: String,
    required: [true, "Please, provide a valid password"],
    minlength: 6,
    select: false,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please, provide a valid phone number"],
    minlength: 9,
  },
  isAdmin: {
    type: Boolean,
    required: [false],
  },
  bio: {
    type: String,
    required: [false],
  },
  savedPets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Pet",
      required: [false],
    },
  ],
  ownedPets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Pet",
      required: [false],
    },
  ],
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", userSchema);
