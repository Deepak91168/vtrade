import express from "express";
const router = express.Router();
import {
  getVehicles,
  createVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";
import { isAuthenticated } from "../utils/isAuthenticatedUser.js";
router.get("/", getVehicles);
router.post("/create", isAuthenticated, createVehicle);
router.delete("/delete/:id", isAuthenticated, deleteVehicle);
export default router;
