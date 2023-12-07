import Vehicle from "../models/vehicleModel.js";
import { customError } from "../utils/customError.js";

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
