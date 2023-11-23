import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { customError } from "../utils/customError.js";
export const signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const securePassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: securePassword,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
