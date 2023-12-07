import express from "express";
const router = express.Router();
import {
  getVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle,
} from "../controllers/vehicleController.js";
import { isAuthenticated } from "../utils/isAuthenticatedUser.js";
router.get("/get-vehicle/:id", getVehicles);
router.post("/create", isAuthenticated, createVehicle);
router.delete("/delete/:id", isAuthenticated, deleteVehicle);
router.put("/update/:id", isAuthenticated, updateVehicle);
export default router;
