import "dotenv/config.js";
import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import pino from "pino-http";
// routes
import authRoutes from "./Routes/authRoutes.js";
import petsRoutes from "./Routes/petsRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
//middlewares
import pageNotFound from "./Middlewares/notFoundPage.js";
import handleError from "./Middlewares/errorHandler.js";
//db and authentication
import connectDB from "./db/connect.js";

const app = express();
app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://adopcy-web.herokuapp.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page of Adopcy!");
});

app.use("/", authRoutes);
app.use("/", petsRoutes);
app.use("/", userRoutes);

app.use(pageNotFound);
app.use(handleError);

async function start() {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Adopcy listening in port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
