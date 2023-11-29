import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import vehicleRouter from "./routes/vehicleRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/vehicle", vehicleRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
