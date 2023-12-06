import Vehicle from "../models/vehicleModel.js";

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
