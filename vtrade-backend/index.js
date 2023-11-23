import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import cors from "cors";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL" + error);
    process.exit(1);
  }
};

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

app.listen(3000, () => console.log("Server running on port 3000"));
