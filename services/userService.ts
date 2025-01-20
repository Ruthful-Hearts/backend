import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserData {
  email: string;
  password: string;
  role?: string;
  [key: string]: any;
}

interface UpdateUserData {
  email?: string;
  password?: string;
  role?: string;
  [key: string]: any;
}

interface FilterQuery {
  [key: string]: any;
}

export const createUser = async (userData: UserData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already in use");
    }
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const authenticateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email }) as any;
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );
    return { user, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId: string, updateData: UpdateUserData) => {
  try {
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async (filters: FilterQuery = {}) => {
  try {
    const users = await User.find(filters).select("-password");
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
