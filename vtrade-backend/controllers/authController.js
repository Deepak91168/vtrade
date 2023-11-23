import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { customError } from "../utils/customError.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";

//* User Registration [Signup]
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

//* User Authentication [login]
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(customError(401, "Email Does Not Exist"));
    }
    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) {
      return next(customError(401, "Password Does Not Match"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //? [mainUser] is the [validUser] object without the password

    const mainUser = {
      name: validUser.name,
      username: validUser.username,
      email: validUser.email,
      _id: validUser._id,
    };
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(mainUser);
  } catch (error) {
    next(error);
  }
};
