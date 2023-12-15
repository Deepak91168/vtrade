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
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    next(error);
  }
};
export const deleteVehicle = async (req, res, next) => {
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
    const limit = parseInt(req.query.limit);
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
    let priceMin = req.query.priceMin === "" ? undefined : req.query.priceMin;
    let priceMax = req.query.priceMax === "" ? undefined : req.query.priceMax;

    const priceFilter = {};

    if (priceMin !== undefined && !isNaN(priceMin)) {
      priceFilter.$gte = parseInt(priceMin);
    }

    if (priceMax !== undefined && !isNaN(priceMax)) {
      priceFilter.$lte = parseInt(priceMax);
    }

    const priceQuery =
      Object.keys(priceFilter).length > 0 ? { priceRegular: priceFilter } : {};

    let kmsDrivenMin =
      req.query.kmsDrivenMin === "" ? undefined : req.query.kmsDrivenMin;
    let kmsDrivenMax =
      req.query.kmsDrivenMax === "" ? undefined : req.query.kmsDrivenMin;

    const kmsDrivenFilter = {};

    if (kmsDrivenMin !== undefined && !isNaN(kmsDrivenMin)) {
      kmsDrivenFilter.$gte = parseInt(kmsDrivenMin);
    }

    if (kmsDrivenMax !== undefined && !isNaN(kmsDrivenMax)) {
      kmsDrivenFilter.$lte = parseInt(kmsDrivenMax);
    }

    const kmsDrivenQuery =
      Object.keys(kmsDrivenFilter).length > 0
        ? { kmsDriven: kmsDrivenFilter }
        : {};

    let modelYearMin =
      req.query.modelYearMin === "" ? undefined : req.query.modelYearMin;
    let modelYearMax =
      req.query.modelYearMax === "" ? undefined : req.query.modelYearMax;

    const modelYearFilter = {};

    if (modelYearMin !== undefined && !isNaN(modelYearMin)) {
      modelYearFilter.$gte = parseInt(modelYearMin);
    }

    if (modelYearMax !== undefined && !isNaN(modelYearMax)) {
      modelYearFilter.$lte = parseInt(modelYearMax);
    }

    const modelYearQuery =
      Object.keys(modelYearFilter).length > 0
        ? { modelYear: modelYearFilter }
        : {};

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
      ...priceQuery,
      ...kmsDrivenQuery,
      ...modelYearQuery,
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
