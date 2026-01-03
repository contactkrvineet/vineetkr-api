import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

// GET - Get all users
router.get("/", getUsers);

// POST - Create a new user
router.post("/", createUser);

// PUT - Update a user by ID
router.put("/:id", updateUser);

// DELETE - Delete a user by ID
router.delete("/:id", deleteUser);

export default router;
