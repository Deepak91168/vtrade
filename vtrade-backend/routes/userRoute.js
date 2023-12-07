import express from "express";
import {
  getUserByID,
  updateUser,
  deleteUser,
  getUserListedVehicles,
} from "../controllers/userController.js";
import { isAuthenticated } from "../utils/isAuthenticatedUser.js";
const router = express.Router();

router.post("/update/:id", isAuthenticated, updateUser);
router.delete("/delete/:id", isAuthenticated, deleteUser);
router.get("/vehicle/:id", isAuthenticated, getUserListedVehicles);
router.get("/:id", isAuthenticated, getUserByID);

export default router;
