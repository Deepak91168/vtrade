import express from "express";
const router = express.Router();
import {
  getVehicles,
  createVehicle,
} from "../controllers/vehicleController.js";
import { isAuthenticated } from "../utils/isAuthenticatedUser.js";
router.get("/", getVehicles);
router.post("/create", isAuthenticated, createVehicle);
export default router;
