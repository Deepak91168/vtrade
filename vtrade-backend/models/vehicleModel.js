import mongoose from "mongoose";
import moment from "moment";
const vehicleSchema = new mongoose.Schema(
  {
    bodyType: {
      type: String,
      required: true,
      enum: [
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
    },
    brand: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      enum: ["Silver", "Black", "White", "Red", "Blue", "Grey", "Brown"],
    },
    description: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"],
    },
    imageURls: {
      type: Array,
      required: true,
    },
    kmsDriven: {
      type: Number,
      required: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    ownerContact: {
      type: Number,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerType: {
      type: String,
      required: true,
      enum: ["1st Owner", "2nd Owner", "3rd Owner"],
    },
    priceRegular: {
      type: Number,
      required: true,
    },
    priceDiscounted: {
      type: Number,
    },
    seats: {
      type: Number,
      required: true,
      enum: [2, 4, 5, 6, 7, 8],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual"],
    },
    userRef: {
      type: String,
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
