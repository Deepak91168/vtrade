import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { customError } from "../utils/customError.js";
import jwt from "jsonwebtoken";
import { generateRandom } from "../utils/utilsFunctions.js";
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
      avatar: validUser.avatar,
    };
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json(mainUser);
  } catch (error) {
    next(error);
  }
};

//* Continue with Google Authentication
export const googleAuth = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  try {
    const user = await User.findOne({ email: email });

    var mainUser;
    if (user != null) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      mainUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        _id: user._id,
        avatar: user.avatar,
      };

      res
        .cookie("access_token", token, {
          httpOnly: true,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .json(mainUser);
    } else {
      const defaultPassword = generateRandom(8);
      const securePassword = await bcryptjs.hash(defaultPassword, 10);
      const newUser = new User({
        name: name,
        username: name.split(" ").join("").toLowerCase() + generateRandom(4),
        email: email,
        password: securePassword,
        avatar: avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      mainUser = {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        _id: newUser._id,
        avatar: newUser.avatar,
      };
      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .json(mainUser);
    }
  } catch (error) {
    next(error);
  }
};

//* Logout User
export const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out...");
  } catch (error) {
    next(error);
  }
};
