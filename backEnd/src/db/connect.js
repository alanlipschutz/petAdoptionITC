import mongoose from "mongoose";

function connectDB(URL) {
  return mongoose.connect(URL);
}

export default connectDB;
