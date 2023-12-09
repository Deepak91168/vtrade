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

export const getVehiclesByFilter = async (req, res, next) => {
  try {
    // Extracting query parameters or setting defaults
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Filtering parameters
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    } else if (offer === "true") {
      offer = true;
    }

    let ownerType = req.query.ownerType;
    if (ownerType === undefined || ownerType === "all") {
      ownerType = { $in: ["1st Owner", "2nd Owner", "3rd Owner"] };
    }

    let transmission = req.query.transmission;
    if (transmission === undefined || transmission === "all") {
      transmission = { $in: ["Automatic", "Manual"] };
    }

    let fuelType = req.query.fuelType;
    if (fuelType === undefined || fuelType === "all") {
      fuelType = {
        $in: ["Petrol", "Diesel", "Electric", "Hybrid", "LPG", "CNG"],
      };
    }

    let bodyType = req.query.bodyType;
    if (bodyType === undefined || bodyType === "all") {
      bodyType = {
        $in: [
          "Sedan",
          "Hatchback",
          "SUV",
          "Crossover",
          "Coupe",
          "Convertible",
          "Wagon",
          "Van",
          "Jeep",
          "Pickup",
        ],
      };
    }

    let city = req.query.city;
    if (city === undefined || city === "all") {
      city = { $regex: req.query.city || "", $options: "i" };
    }

    let color = req.query.color;
    if (color === undefined || color === "all") {
      color = {
        $in: ["Silver", "Black", "White", "Red", "Blue", "Grey", "Brown"],
      };
    }

    let seats = req.query.seats;
    if (seats === undefined || seats === "all") {
      seats = { $gte: 0 };
    }
    //TODO: Price, Kms and Model Year filter

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const vehicles = await Vehicle.find({
      vehicleName: { $regex: searchTerm, $options: "i" },
      offer,
      transmission,
      fuelType,
      color,
      city,
      brand: { $regex: req.query.brand || "", $options: "i" },
      bodyType,
      ownerType,
      seats,
    })
      .sort([[sort, order]])
      .limit(limit)
      .skip(startIndex);
    if (vehicles.length === 0)
      return res.status(200).json({ message: "No Vehicles Found" });
    return res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};
