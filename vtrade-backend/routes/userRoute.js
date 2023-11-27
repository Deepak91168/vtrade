import express from "express";
import { getUser, updateUser,deleteUser } from "../controllers/userController.js";
import { isAuthenticated } from "../utils/isAuthenticatedUser.js";
const router = express.Router();

router.get("/", getUser);
router.post("/update/:id", isAuthenticated, updateUser);
router.delete("/delete/:id", isAuthenticated, deleteUser);

export default router;
