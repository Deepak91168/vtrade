import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Brand: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    modelYear: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      enum: ["Silver", "White", "Black", "Red", "Blue", "Grey", "Brown"],
    },
    ownerName: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
      enum: ["1st Owner", "2nd Owner", "3rd Owner"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Automatic"],
    },
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
    kmsDriven: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      enum: [2, 4, 5, 6, 7, 8],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"],
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    ownerContact: {
      type: String,
      required: true,
    },
  
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Reference to the User model
    //   required: true,
    // },
  },
  { timestamps: true }
);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
