import Vehicle from "../models/vehicleModel.js";
import { customError } from "../utils/customError.js";

export const getVehicles = async (req, res, next) => {
  try {
    const vehicleID = req.params.id;
    const vehicle = await Vehicle.findById(vehicleID);
    if (!vehicle) return next(customError(404, "Vehicle not found"));
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createVehicle = async (req, res, next) => {
  try {
    console.log("From Vehicle Controller");
    console.log(req.body);
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    next(error);
  }
};
export const deleteVehicle = async (req, res, next) => {
  console.log("VID : ", req.params.id);
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
      if (req.user.id !== vehicle.userRef) {
        return next(customError(401, "Not Authorized"));
      }
      await Vehicle.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Vehicle deleted" });
    } else {
      return next(customError(404, "Vehicle not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
      if (req.user.id !== vehicle.userRef) {
        return next(customError(401, "Not Authorized"));
      }
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json(updatedVehicle);
    } else {
      return next(customError(404, "Vehicle not found"));
    }
  } catch (error) {
    next(error);
  }
};
