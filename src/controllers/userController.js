import { User } from "../models/User.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/userValidator.js";

// GET - Get all users or single user
export const getUsers = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (id) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.json({
        success: true,
        data: user,
      });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// POST - Create a new user
export const createUser = async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = createUserSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = await User.create(validatedData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    next(error);
  }
};

// PUT - Update an existing user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate request body
    const validatedData = updateUserSchema.parse(req.body);

    // Check if updating email and if it already exists
    if (validatedData.email) {
      const existingUser = await User.findOne({
        email: validatedData.email,
        _id: { $ne: id },
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use by another user",
        });
      }
    }

    const user = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    next(error);
  }
};

// DELETE - Delete a user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
