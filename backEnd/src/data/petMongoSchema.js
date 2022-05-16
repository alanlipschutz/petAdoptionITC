import mongoose from "mongoose";
import validator from "validator";

const petMongoSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["dog", "cat"],
      required: [true, "Please, provide a type of pet"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please, provide a valid name"],
      trim: true,
    },
    adoptionStatus: {
      type: String,
      enum: ["Adopted", "Fostered", "Available"],
      required: [true, "Please, provide a status"],
      default: "Available",
    },
    picture: {
      type: String,
      required: [true, "Please, provide a picture"],
      validate: {
        validator: validator.isURL,
        message: "Please, provide a valid URL",
      },
    },

    height: {
      type: Number,
      required: [true, "Please, provide a heigth"],
      maxlength: 10,
    },
    weight: {
      type: Number,
      required: [true, "Please, provide a weight"],
      maxlength: 10,
    },
    color: {
      type: String,
      required: [true, "Please, provide a color"],
    },
    bio: {
      type: String,
      required: [false],
    },
    hypoallergenic: {
      type: String,
      enum: ["no", "yes"],
      default: "no",
      required: [true],
    },
    dietaryRestrictions: {
      type: String,
      required: [false],
    },
    breed: {
      type: String,
      required: [true, "Please, provide a valid breed"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petMongoSchema);
