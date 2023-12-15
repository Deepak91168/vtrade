import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Vehicle from "../models/vehicleModel.js";
import { customError } from "../utils/customError.js";

export const getUserByID = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    return next(error);
  }
};

//* Update User Account
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customError(401, "You are not authorized to update this user"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (error) {
    return next(error);
  }
};

//* Delete User Account
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  if (req.user.id !== userId) {
    return next(customError(401, "You are not authorized to delete this user"));
  }
  try {
    await User.findByIdAndDelete(userId);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted...");
  } catch (error) {
    return next(error);
  }
};

//* Get User Listed Vehicles
export const getUserListedVehicles = async (req, res, next) => {
  const userId = req.params.id;
  if (req.user.id !== userId) {
    return next(
      customError(401, "You are not authorized to view this user's vehicles")
    );
  }
  try {
    const vehicle = await Vehicle.find({ userRef: userId });
    res.status(200).json(vehicle);
  } catch (error) {
    return next(error);
  }
};
